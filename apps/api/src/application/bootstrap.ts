import Redis from "ioredis";
import { SERVICE_NAME, SERVICE_VERSION } from "../constants.js";
import { createFastifyRestServer } from "../infrastructure/in/rest/fastify/fastify.js";
import { RedisCache } from "../infrastructure/out/cache/redis-cache.js";
import { DrizzleDatabase } from "../infrastructure/out/database/drizzle/database.js";
import { DrizzleConditionsRepository } from "../infrastructure/out/database/drizzle/repositories/conditions-repository.js";
import { DrizzleFollowUpVisitsRepository } from "../infrastructure/out/database/drizzle/repositories/follow-up-visits-repository.js";
import { DrizzleManufacturersRepository } from "../infrastructure/out/database/drizzle/repositories/manufacturers-repository.js";
import { DrizzleObservationsRepository } from "../infrastructure/out/database/drizzle/repositories/observations-repository.js";
import { DrizzlePatientsRepository } from "../infrastructure/out/database/drizzle/repositories/patients-repository.js";
import { DrizzleProceduresRepository } from "../infrastructure/out/database/drizzle/repositories/procedures-repository.js";
import { DrizzleQueuesRepository } from "../infrastructure/out/database/drizzle/repositories/queues-repository.js";
import { DrizzleVisitsRepository } from "../infrastructure/out/database/drizzle/repositories/visits-repository.js";
import { DrizzleUsersRepository } from "../infrastructure/out/database/drizzle/repositories/users-repository.js";
import { DrizzleProductsRepository } from "../infrastructure/out/database/drizzle/repositories/products-repository.js";
import { DrizzleConditionReferencesRepository } from "../infrastructure/out/database/drizzle/repositories/condition-references-repository.js";
import { DrizzleProcedureReferencesRepository } from "../infrastructure/out/database/drizzle/repositories/procedure-references-repository.js";
import { DrizzleRefreshTokensRepository } from "../infrastructure/out/database/drizzle/repositories/refresh-tokens-repository.js";
import { DrizzleRolesRepository } from "../infrastructure/out/database/drizzle/repositories/roles-repository.js";
import { HttpSatuSehat } from "../infrastructure/out/satusehat/http-satuSehat.js";
import type { Cache } from "../domain/ports/out/cache.js";
import type {
  Database,
  TxContext,
} from "../domain/ports/out/database/database.js";
import type { ConditionsRepository } from "../domain/ports/out/database/conditions-repository.js";
import type { FollowUpVisitsRepository } from "../domain/ports/out/database/follow-up-visits-repository.js";
import type { ObservationsRepository } from "../domain/ports/out/database/observations-repository.js";
import type { PatientsRepository } from "../domain/ports/out/database/patients-repository.js";
import type { ProceduresRepository } from "../domain/ports/out/database/procedures-repository.js";
import type { QueuesRepository } from "../domain/ports/out/database/queues-repository.js";
import type { VisitsRepository } from "../domain/ports/out/database/visits-repository.js";
import type { UsersRepository } from "../domain/ports/out/database/users-repository.js";
import type { ProductsRepository } from "../domain/ports/out/database/products-repository.js";
import type { ManufacturersRepository } from "../domain/ports/out/database/manufacturers-repository.js";
import type { ConditionReferencesRepository } from "../domain/ports/out/database/condition-references-repository.js";
import type { ProcedureReferencesRepository } from "../domain/ports/out/database/procedure-references-repository.js";
import type { RefreshTokensRepository } from "../domain/ports/out/database/refresh-tokens-repository.js";
import type { RolesRepository } from "../domain/ports/out/database/roles-repository.js";
import type { SatuSehat } from "../domain/ports/out/satuSehat.js";
import { initLogger, type LogLevel } from "../observability/logging.js";
import { loadConfig } from "./config.js";
import { seedRolesAndAdmin } from "./seed.js";
import { CreatePatientService } from "./services/patients/create-patient.js";
import { DeletePatientService } from "./services/patients/delete-patient.js";
import { GetPatientService } from "./services/patients/get-patient.js";
import { ListPatientsService } from "./services/patients/list-patients.js";
import { UpdatePatientService } from "./services/patients/update-patient.js";
import { CreateQueueService } from "./services/queues/create-queue.js";
import { DeleteQueueService } from "./services/queues/delete-queue.js";
import { GetQueueService } from "./services/queues/get-queue.js";
import { ListQueuesService } from "./services/queues/list-queues.js";
import { UpdateQueueService } from "./services/queues/update-queue.js";
import { GetVisitService } from "./services/visits/get-visit.js";
import { ListVisitsService } from "./services/visits/list-visits.js";
import { CreateObservationService } from "./services/observations/create-observation.js";
import { DeleteObservationService } from "./services/observations/delete-observation.js";
import { GetObservationService } from "./services/observations/get-observation.js";
import { ListObservationsService } from "./services/observations/list-observations.js";
import { UpdateObservationService } from "./services/observations/update-observation.js";
import { UpdateObservationStatusService } from "./services/observations/update-observation-status.js";
import { CreateConditionService } from "./services/conditions/create-condition.js";
import { DeleteConditionService } from "./services/conditions/delete-condition.js";
import { GetConditionService } from "./services/conditions/get-condition.js";
import { ListConditionsService } from "./services/conditions/list-conditions.js";
import { UpdateConditionService } from "./services/conditions/update-condition.js";
import { CreateProcedureService } from "./services/procedures/create-procedure.js";
import { DeleteProcedureService } from "./services/procedures/delete-procedure.js";
import { GetProcedureService } from "./services/procedures/get-procedure.js";
import { ListProceduresService } from "./services/procedures/list-procedures.js";
import { UpdateProcedureService } from "./services/procedures/update-procedure.js";
import { CreateFollowUpVisitService } from "./services/follow-up-visits/create-follow-up-visit.js";
import { GetFollowUpVisitService } from "./services/follow-up-visits/get-follow-up-visit.js";
import { ListFollowUpVisitsService } from "./services/follow-up-visits/list-follow-up-visits.js";
import { UpdateFollowUpVisitService } from "./services/follow-up-visits/update-follow-up-visit.js";
import { LoginService } from "./services/auth/login.js";
import { LogoutService } from "./services/auth/logout.js";
import { RefreshTokenService } from "./services/auth/refresh-token.js";
import { VerifyTokenService } from "./services/auth/verify-token.js";
import { GetAuthUserService } from "./services/auth/get-auth-user.js";
import { CreateRoleService } from "./services/roles/create-role.js";
import { DeleteRoleService } from "./services/roles/delete-role.js";
import { GetRoleService } from "./services/roles/get-role.js";
import { ListRolesService } from "./services/roles/list-roles.js";
import { UpdateRoleService } from "./services/roles/update-role.js";
import { CreateUserService } from "./services/users/create-user.js";
import { DeleteUserService } from "./services/users/delete-user.js";
import { GetUserService } from "./services/users/get-user.js";
import { ListUsersService } from "./services/users/list-users.js";
import { UpdateUserService } from "./services/users/update-user.js";
import { CreateProductService } from "./services/products/create-product.js";
import { DeleteProductService } from "./services/products/delete-product.js";
import { GetProductService } from "./services/products/get-product.js";
import { ListProductsService } from "./services/products/list-products.js";
import { UpdateProductService } from "./services/products/update-product.js";
import { CreateManufacturerService } from "./services/manufacturers/create-manufacturer.js";
import { DeleteManufacturerService } from "./services/manufacturers/delete-manufacturer.js";
import { GetManufacturerService } from "./services/manufacturers/get-manufacturer.js";
import { ListManufacturersService } from "./services/manufacturers/list-manufacturers.js";
import { UpdateManufacturerService } from "./services/manufacturers/update-manufacturer.js";
import { CreateConditionReferenceService } from "./services/condition-references/create-condition-reference.js";
import { DeleteConditionReferenceService } from "./services/condition-references/delete-condition-reference.js";
import { GetConditionReferenceService } from "./services/condition-references/get-condition-reference.js";
import { ListConditionReferencesService } from "./services/condition-references/list-condition-references.js";
import { UpdateConditionReferenceService } from "./services/condition-references/update-condition-reference.js";
import { CreateProcedureReferenceService } from "./services/procedure-references/create-procedure-reference.js";
import { DeleteProcedureReferenceService } from "./services/procedure-references/delete-procedure-reference.js";
import { GetProcedureReferenceService } from "./services/procedure-references/get-procedure-reference.js";
import { ListProcedureReferencesService } from "./services/procedure-references/list-procedure-references.js";
import { UpdateProcedureReferenceService } from "./services/procedure-references/update-procedure-reference.js";

export type BuildAppOptions<TxCtx extends TxContext<any>> = {
  logger?: boolean;
  logLevel?: LogLevel;
  db: Database<TxCtx>;
  patientsRepository: PatientsRepository<TxCtx>;
  queuesRepository: QueuesRepository<TxCtx>;
  visitsRepository: VisitsRepository<TxCtx>;
  observationsRepository: ObservationsRepository<TxCtx>;
  conditionsRepository: ConditionsRepository<TxCtx>;
  proceduresRepository: ProceduresRepository<TxCtx>;
  followUpVisitsRepository: FollowUpVisitsRepository<TxCtx>;
  usersRepository: UsersRepository<TxCtx>;
  rolesRepository: RolesRepository<TxCtx>;
  refreshTokensRepository: RefreshTokensRepository<TxCtx>;
  productsRepository: ProductsRepository<TxCtx>;
  manufacturersRepository: ManufacturersRepository<TxCtx>;
  conditionReferencesRepository: ConditionReferencesRepository<TxCtx>;
  procedureReferencesRepository: ProcedureReferencesRepository<TxCtx>;
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshTokenTtlSeconds: number;
  cookieSecure?: boolean;
  cache?: Cache;
  satuSehat?: SatuSehat;
};

/**
 * Composition root (test-friendly).
 *
 * Wires the injected outbound adapters → application use cases → inbound REST
 * adapter and returns a Fastify instance (without listening, so tests can
 * `inject`).
 */
export function buildApp<TxCtx extends TxContext<any>>(
  options: BuildAppOptions<TxCtx>,
) {
  initLogger({
    logLevel:
      options.logLevel ?? (options.logger === false ? "silent" : "info"),
    base: { service: SERVICE_NAME, version: SERVICE_VERSION },
  });

  const deps = {
    createPatientService: new CreatePatientService({
      db: options.db,
      patientsRepository: options.patientsRepository,
      satuSehat: options.satuSehat,
    }),
    deletePatientService: new DeletePatientService({
      db: options.db,
      patientsRepository: options.patientsRepository,
      cache: options.cache,
    }),
    getPatientService: new GetPatientService({
      db: options.db,
      patientsRepository: options.patientsRepository,
      cache: options.cache,
    }),
    listPatientsService: new ListPatientsService({
      db: options.db,
      patientsRepository: options.patientsRepository,
    }),
    updatePatientService: new UpdatePatientService({
      db: options.db,
      patientsRepository: options.patientsRepository,
      cache: options.cache,
    }),
    createQueueService: new CreateQueueService({
      db: options.db,
      queuesRepository: options.queuesRepository,
    }),
    deleteQueueService: new DeleteQueueService({
      db: options.db,
      queuesRepository: options.queuesRepository,
    }),
    getQueueService: new GetQueueService({
      db: options.db,
      queuesRepository: options.queuesRepository,
    }),
    listQueuesService: new ListQueuesService({
      db: options.db,
      queuesRepository: options.queuesRepository,
    }),
    updateQueueService: new UpdateQueueService({
      db: options.db,
      queuesRepository: options.queuesRepository,
      visitsRepository: options.visitsRepository,
    }),
    getVisitService: new GetVisitService({
      db: options.db,
      visitsRepository: options.visitsRepository,
    }),
    listVisitsService: new ListVisitsService({
      db: options.db,
      visitsRepository: options.visitsRepository,
    }),
    createObservationService: new CreateObservationService({
      db: options.db,
      observationsRepository: options.observationsRepository,
    }),
    deleteObservationService: new DeleteObservationService({
      db: options.db,
      observationsRepository: options.observationsRepository,
    }),
    getObservationService: new GetObservationService({
      db: options.db,
      observationsRepository: options.observationsRepository,
    }),
    listObservationsService: new ListObservationsService({
      db: options.db,
      observationsRepository: options.observationsRepository,
    }),
    updateObservationService: new UpdateObservationService({
      db: options.db,
      observationsRepository: options.observationsRepository,
    }),
    updateObservationStatusService: new UpdateObservationStatusService({
      db: options.db,
      observationsRepository: options.observationsRepository,
    }),
    createConditionService: new CreateConditionService({
      db: options.db,
      conditionsRepository: options.conditionsRepository,
    }),
    deleteConditionService: new DeleteConditionService({
      db: options.db,
      conditionsRepository: options.conditionsRepository,
    }),
    getConditionService: new GetConditionService({
      db: options.db,
      conditionsRepository: options.conditionsRepository,
    }),
    listConditionsService: new ListConditionsService({
      db: options.db,
      conditionsRepository: options.conditionsRepository,
    }),
    updateConditionService: new UpdateConditionService({
      db: options.db,
      conditionsRepository: options.conditionsRepository,
    }),
    createProcedureService: new CreateProcedureService({
      db: options.db,
      proceduresRepository: options.proceduresRepository,
    }),
    deleteProcedureService: new DeleteProcedureService({
      db: options.db,
      proceduresRepository: options.proceduresRepository,
    }),
    getProcedureService: new GetProcedureService({
      db: options.db,
      proceduresRepository: options.proceduresRepository,
    }),
    listProceduresService: new ListProceduresService({
      db: options.db,
      proceduresRepository: options.proceduresRepository,
    }),
    updateProcedureService: new UpdateProcedureService({
      db: options.db,
      proceduresRepository: options.proceduresRepository,
    }),
    createFollowUpVisitService: new CreateFollowUpVisitService({
      db: options.db,
      followUpVisitsRepository: options.followUpVisitsRepository,
    }),
    getFollowUpVisitService: new GetFollowUpVisitService({
      db: options.db,
      followUpVisitsRepository: options.followUpVisitsRepository,
    }),
    listFollowUpVisitsService: new ListFollowUpVisitsService({
      db: options.db,
      followUpVisitsRepository: options.followUpVisitsRepository,
    }),
    updateFollowUpVisitService: new UpdateFollowUpVisitService({
      db: options.db,
      followUpVisitsRepository: options.followUpVisitsRepository,
    }),
    loginService: new LoginService({
      db: options.db,
      usersRepository: options.usersRepository,
      rolesRepository: options.rolesRepository,
      refreshTokensRepository: options.refreshTokensRepository,
      jwtSecret: options.jwtSecret,
      jwtExpiresIn: options.jwtExpiresIn,
      refreshTokenTtlSeconds: options.refreshTokenTtlSeconds,
    }),
    refreshService: new RefreshTokenService({
      db: options.db,
      usersRepository: options.usersRepository,
      rolesRepository: options.rolesRepository,
      refreshTokensRepository: options.refreshTokensRepository,
      jwtSecret: options.jwtSecret,
      jwtExpiresIn: options.jwtExpiresIn,
      refreshTokenTtlSeconds: options.refreshTokenTtlSeconds,
    }),
    logoutService: new LogoutService({
      db: options.db,
      refreshTokensRepository: options.refreshTokensRepository,
      cache: options.cache,
    }),
    verifyTokenService: new VerifyTokenService({
      cache: options.cache,
      jwtSecret: options.jwtSecret,
    }),
    getAuthUserService: new GetAuthUserService({
      db: options.db,
      usersRepository: options.usersRepository,
      rolesRepository: options.rolesRepository,
    }),
    cookieSecure: options.cookieSecure ?? false,
    refreshTokenTtlSeconds: options.refreshTokenTtlSeconds,
    createRoleService: new CreateRoleService({
      db: options.db,
      rolesRepository: options.rolesRepository,
    }),
    deleteRoleService: new DeleteRoleService({
      db: options.db,
      rolesRepository: options.rolesRepository,
      usersRepository: options.usersRepository,
    }),
    getRoleService: new GetRoleService({
      db: options.db,
      rolesRepository: options.rolesRepository,
    }),
    listRolesService: new ListRolesService({
      db: options.db,
      rolesRepository: options.rolesRepository,
    }),
    updateRoleService: new UpdateRoleService({
      db: options.db,
      rolesRepository: options.rolesRepository,
    }),
    createUserService: new CreateUserService({
      db: options.db,
      usersRepository: options.usersRepository,
    }),
    deleteUserService: new DeleteUserService({
      db: options.db,
      usersRepository: options.usersRepository,
    }),
    getUserService: new GetUserService({
      db: options.db,
      usersRepository: options.usersRepository,
    }),
    listUsersService: new ListUsersService({
      db: options.db,
      usersRepository: options.usersRepository,
    }),
    updateUserService: new UpdateUserService({
      db: options.db,
      usersRepository: options.usersRepository,
    }),
    createProductService: new CreateProductService({
      db: options.db,
      productsRepository: options.productsRepository,
    }),
    deleteProductService: new DeleteProductService({
      db: options.db,
      productsRepository: options.productsRepository,
    }),
    getProductService: new GetProductService({
      db: options.db,
      productsRepository: options.productsRepository,
    }),
    listProductsService: new ListProductsService({
      db: options.db,
      productsRepository: options.productsRepository,
    }),
    updateProductService: new UpdateProductService({
      db: options.db,
      productsRepository: options.productsRepository,
    }),
    createManufacturerService: new CreateManufacturerService({
      db: options.db,
      manufacturersRepository: options.manufacturersRepository,
    }),
    deleteManufacturerService: new DeleteManufacturerService({
      db: options.db,
      manufacturersRepository: options.manufacturersRepository,
    }),
    getManufacturerService: new GetManufacturerService({
      db: options.db,
      manufacturersRepository: options.manufacturersRepository,
    }),
    listManufacturersService: new ListManufacturersService({
      db: options.db,
      manufacturersRepository: options.manufacturersRepository,
    }),
    updateManufacturerService: new UpdateManufacturerService({
      db: options.db,
      manufacturersRepository: options.manufacturersRepository,
    }),
    createConditionReferenceService: new CreateConditionReferenceService({
      db: options.db,
      conditionReferencesRepository: options.conditionReferencesRepository,
    }),
    deleteConditionReferenceService: new DeleteConditionReferenceService({
      db: options.db,
      conditionReferencesRepository: options.conditionReferencesRepository,
    }),
    getConditionReferenceService: new GetConditionReferenceService({
      db: options.db,
      conditionReferencesRepository: options.conditionReferencesRepository,
    }),
    listConditionReferencesService: new ListConditionReferencesService({
      db: options.db,
      conditionReferencesRepository: options.conditionReferencesRepository,
    }),
    updateConditionReferenceService: new UpdateConditionReferenceService({
      db: options.db,
      conditionReferencesRepository: options.conditionReferencesRepository,
    }),
    createProcedureReferenceService: new CreateProcedureReferenceService({
      db: options.db,
      procedureReferencesRepository: options.procedureReferencesRepository,
    }),
    deleteProcedureReferenceService: new DeleteProcedureReferenceService({
      db: options.db,
      procedureReferencesRepository: options.procedureReferencesRepository,
    }),
    getProcedureReferenceService: new GetProcedureReferenceService({
      db: options.db,
      procedureReferencesRepository: options.procedureReferencesRepository,
    }),
    listProcedureReferencesService: new ListProcedureReferencesService({
      db: options.db,
      procedureReferencesRepository: options.procedureReferencesRepository,
    }),
    updateProcedureReferenceService: new UpdateProcedureReferenceService({
      db: options.db,
      procedureReferencesRepository: options.procedureReferencesRepository,
    }),
  };

  return createFastifyRestServer(deps);
}

/**
 * Production composition: wires real outbound adapters (Postgres via Drizzle,
 * Redis cache, SatuSehat) from environment config.
 */
export async function bootstrap() {
  const config = loadConfig();

  initLogger({
    logLevel: config.logLevel,
    base: { service: SERVICE_NAME, version: SERVICE_VERSION },
  });

  const db = new DrizzleDatabase({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    ssl: config.database.ssl,
  });

  const patientsRepository = new DrizzlePatientsRepository();
  const queuesRepository = new DrizzleQueuesRepository();
  const visitsRepository = new DrizzleVisitsRepository();
  const observationsRepository = new DrizzleObservationsRepository();
  const conditionsRepository = new DrizzleConditionsRepository();
  const proceduresRepository = new DrizzleProceduresRepository();
  const followUpVisitsRepository = new DrizzleFollowUpVisitsRepository();
  const usersRepository = new DrizzleUsersRepository();
  const rolesRepository = new DrizzleRolesRepository();
  const refreshTokensRepository = new DrizzleRefreshTokensRepository();
  const productsRepository = new DrizzleProductsRepository();
  const manufacturersRepository = new DrizzleManufacturersRepository();
  const conditionReferencesRepository = new DrizzleConditionReferencesRepository();
  const procedureReferencesRepository = new DrizzleProcedureReferencesRepository();

  const cache = new RedisCache(
    new Redis({ host: config.redis.host, port: config.redis.port }),
  );

  const satuSehat = new HttpSatuSehat(config.satusehat);

  await seedRolesAndAdmin({
    db,
    usersRepository,
    rolesRepository,
    email: config.admin.email,
    password: config.admin.password,
    name: config.admin.name,
  });

  return buildApp({
    logLevel: config.logLevel,
    db,
    patientsRepository,
    queuesRepository,
    visitsRepository,
    observationsRepository,
    conditionsRepository,
    proceduresRepository,
    followUpVisitsRepository,
    usersRepository,
    rolesRepository,
    refreshTokensRepository,
    productsRepository,
    manufacturersRepository,
    conditionReferencesRepository,
    procedureReferencesRepository,
    jwtSecret: config.jwt.secret,
    jwtExpiresIn: config.jwt.expiresIn,
    refreshTokenTtlSeconds: config.refreshTokenTtlSeconds,
    cookieSecure: config.cookieSecure,
    cache,
    satuSehat,
  });
}
