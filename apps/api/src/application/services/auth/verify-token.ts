import jwt from "jsonwebtoken";
import { VERIFY_TOKEN_USE_CASE } from "../../../constants.js";
import { UnauthorizedError } from "../../../domain/errors/domain/unauthorized-error.js";
import type {
  VerifyTokenInput,
  VerifyTokenOutput,
  VerifyTokenUseCase,
} from "../../../domain/ports/in/auth/verify-token.js";
import type { Cache } from "../../../domain/ports/out/cache.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type VerifyTokenServiceDeps = {
  cache?: Cache;
  jwtSecret: string;
};

export class VerifyTokenService
  extends BaseUseCase
  implements VerifyTokenUseCase
{
  private readonly cache?: Cache;
  private readonly jwtSecret: string;

  constructor(deps: VerifyTokenServiceDeps) {
    super(VERIFY_TOKEN_USE_CASE);
    this.cache = deps.cache;
    this.jwtSecret = deps.jwtSecret;
  }

  async verifyToken(input: VerifyTokenInput): Promise<VerifyTokenOutput> {
    if (this.cache) {
      const blacklisted = await this.cache.get(`blacklist:${input.accessToken}`);
      if (blacklisted) {
        throw new UnauthorizedError("Token has been revoked");
      }
    }

    try {
      const payload = jwt.verify(input.accessToken, this.jwtSecret) as {
        sub: string;
        type?: string;
      };

      if (payload.type !== "access") {
        throw new UnauthorizedError("Invalid token type");
      }

      return { userId: payload.sub };
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        throw err;
      }
      throw new UnauthorizedError("Invalid or expired token");
    }
  }
}
