import { allPermissions } from "../domain/permissions.js";
import type {
  Database,
  TxContext,
} from "../domain/ports/out/database/database.js";
import type { RolesRepository } from "../domain/ports/out/database/roles-repository.js";
import type { UsersRepository } from "../domain/ports/out/database/users-repository.js";
import { getLogger } from "../observability/logging.js";
import { CreateUserService } from "./services/users/create-user.js";

type ClassicRoleDefinition = {
  name: string;
  description: string;
  permissions: string[];
};

const CLASSIC_ROLES: ClassicRoleDefinition[] = [
  {
    name: "paramedic",
    description: "Front-desk / nursing staff managing patients & queues",
    permissions: [
      "patients:read", "patients:write", "patients:delete",
      "queues:read", "queues:write", "queues:delete",
      "visits:read",
    ],
  },
  {
    name: "doctor",
    description: "Clinical staff managing observations, conditions, procedures",
    permissions: [
      "patients:read",
      "visits:read",
      "follow-up-visits:read", "follow-up-visits:write", "follow-up-visits:delete",
      "observations:read", "observations:write", "observations:delete",
      "conditions:read", "conditions:write", "conditions:delete",
      "procedures:read", "procedures:write", "procedures:delete",
    ],
  },
  {
    name: "logistic_admin",
    description: "Manages product & manufacturer catalogs",
    permissions: [
      "products:read", "products:write", "products:delete",
      "manufacturers:read", "manufacturers:write", "manufacturers:delete",
    ],
  },
  {
    name: "admin",
    description: "Superuser — everything, incl. users, references & roles",
    permissions: allPermissions(),
  },
];

export type SeedOptions<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  usersRepository: UsersRepository<TxCtx>;
  rolesRepository: RolesRepository<TxCtx>;
  email: string;
  password: string;
  name?: string;
};

/**
 * Seeds the classic roles (idempotently) and an initial admin user when none
 * exists. This lets a fresh deployment bootstrap the `admin` role and user.
 */
export async function seedRolesAndAdmin<TxCtx extends TxContext<any>>(
  options: SeedOptions<TxCtx>,
): Promise<void> {
  const log = getLogger();

  const adminRole = await options.db.beginTx(async (ctx) => {
    let admin: { id: string } | undefined;
    for (const def of CLASSIC_ROLES) {
      const existing = await options.rolesRepository.findByName(ctx, def.name);
      if (existing) {
        if (def.name === "admin") admin = existing;
        continue;
      }
      const role = await options.rolesRepository.create(ctx, {
        name: def.name,
        description: def.description,
        permissions: def.permissions,
        isSystem: true,
      });
      if (def.name === "admin") admin = role;
    }
    return admin!;
  });

  const existingAdmins = await options.db.beginTx((ctx) =>
    options.usersRepository.list(ctx, 1, undefined, adminRole.id),
  );

  if (existingAdmins.length > 0) {
    log.info("Admin user already exists; skipping seed");
    return;
  }

  const createUser = new CreateUserService({
    db: options.db,
    usersRepository: options.usersRepository,
  });

  const user = await createUser.createUser({
    email: options.email,
    password: options.password,
    name: options.name,
    roleId: adminRole.id,
  });

  log.info({ userId: user.id }, "Seeded initial admin user");
}
