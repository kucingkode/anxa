import type { Patient } from "@simk/contracts";
import type { SatuSehatConfig } from "../../../application/config.js";
import { OUTBOUND_DIRECTION, SATUSEHAT_PORT } from "../../../constants.js";
import { SatuSehatError } from "../../../domain/errors/infrastructure-errors.js";
import type { SatuSehat } from "../../../domain/ports/out/satuSehat.js";
import { BaseAdapter } from "../../../shared/classes/base-adapter.js";
import { toFhirPatient } from "./fhir/patient.js";

type FetchFn = typeof fetch;

/**
 * SatuSehat FHIR R4 client.
 *
 * Authentication uses OAuth2 client-credentials against the SatuSehat auth
 * endpoint; resources are submitted to the FHIR R4 REST API.
 *
 * The `fetchFn` is injectable so tests (and future retry/timeout wrappers) can
 * substitute a mock transport.
 */
export class HttpSatuSehat extends BaseAdapter implements SatuSehat {
  private accessToken: string | undefined;

  constructor(
    private readonly config: SatuSehatConfig,
    private readonly fetchFn: FetchFn = fetch,
  ) {
    super(SATUSEHAT_PORT, OUTBOUND_DIRECTION, SatuSehatError);
  }

  get enabled(): boolean {
    return Boolean(
      this.config.clientId &&
        this.config.clientSecret &&
        this.config.organizationId,
    );
  }

  async authenticate(): Promise<string> {
    return this.call(async () => {
      const url = `${this.config.authUrl}/accesstoken?grant_type=client_credentials`;
      const res = await this.fetchFn(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        }),
      });

      if (!res.ok) {
        throw new Error(`authentication failed (status ${res.status})`);
      }

      const body = (await res.json()) as { access_token?: string };
      if (!body.access_token) {
        throw new Error("authentication response is missing access_token");
      }

      return body.access_token;
    }, "authenticate: SatuSehat authentication failed");
  }

  async getAccessToken(): Promise<string> {
    if (!this.accessToken) {
      this.accessToken = await this.authenticate();
    }
    return this.accessToken;
  }

  /** Submit a patient to SatuSehat and return the assigned IHS number. */
  async createPatient(patient: Patient): Promise<string> {
    return this.call(async () => {
      const token = await this.getAccessToken();
      const fhirPatient = toFhirPatient(patient);

      const res = await this.fetchFn(`${this.config.baseUrl}/Patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fhirPatient),
      });

      if (!res.ok) {
        throw new Error(`createPatient failed (status ${res.status})`);
      }

      const created = (await res.json()) as { id?: string };
      if (!created.id) {
        throw new Error("createPatient response is missing id");
      }

      return created.id;
    }, "createPatient: SatuSehat createPatient failed");
  }
}
