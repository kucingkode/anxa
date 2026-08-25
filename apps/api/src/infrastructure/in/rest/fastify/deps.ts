import type { CreatePatientUseCase } from "../../../../domain/ports/in/patients/create-patient.js";
import type { DeletePatientUseCase } from "../../../../domain/ports/in/patients/delete-patient.js";
import type { GetPatientUseCase } from "../../../../domain/ports/in/patients/get-patient.js";
import type { ListPatientsUseCase } from "../../../../domain/ports/in/patients/list-patients.js";
import type { UpdatePatientUseCase } from "../../../../domain/ports/in/patients/update-patient.js";
import type { CreateQueueUseCase } from "../../../../domain/ports/in/queues/create-queue.js";
import type { DeleteQueueUseCase } from "../../../../domain/ports/in/queues/delete-queue.js";
import type { GetQueueUseCase } from "../../../../domain/ports/in/queues/get-queue.js";
import type { ListQueuesUseCase } from "../../../../domain/ports/in/queues/list-queues.js";
import type { UpdateQueueUseCase } from "../../../../domain/ports/in/queues/update-queue.js";
import type { GetVisitUseCase } from "../../../../domain/ports/in/visits/get-visit.js";
import type { ListVisitsUseCase } from "../../../../domain/ports/in/visits/list-visits.js";
import type { CreateObservationUseCase } from "../../../../domain/ports/in/observations/create-observation.js";
import type { DeleteObservationUseCase } from "../../../../domain/ports/in/observations/delete-observation.js";
import type { GetObservationUseCase } from "../../../../domain/ports/in/observations/get-observation.js";
import type { ListObservationsUseCase } from "../../../../domain/ports/in/observations/list-observations.js";
import type { UpdateObservationUseCase } from "../../../../domain/ports/in/observations/update-observation.js";
import type { UpdateObservationStatusUseCase } from "../../../../domain/ports/in/observations/update-observation-status.js";
import type { CreateConditionUseCase } from "../../../../domain/ports/in/conditions/create-condition.js";
import type { DeleteConditionUseCase } from "../../../../domain/ports/in/conditions/delete-condition.js";
import type { GetConditionUseCase } from "../../../../domain/ports/in/conditions/get-condition.js";
import type { ListConditionsUseCase } from "../../../../domain/ports/in/conditions/list-conditions.js";
import type { UpdateConditionUseCase } from "../../../../domain/ports/in/conditions/update-condition.js";
import type { CreateProcedureUseCase } from "../../../../domain/ports/in/procedures/create-procedure.js";
import type { DeleteProcedureUseCase } from "../../../../domain/ports/in/procedures/delete-procedure.js";
import type { GetProcedureUseCase } from "../../../../domain/ports/in/procedures/get-procedure.js";
import type { ListProceduresUseCase } from "../../../../domain/ports/in/procedures/list-procedures.js";
import type { UpdateProcedureUseCase } from "../../../../domain/ports/in/procedures/update-procedure.js";
import type { CreateFollowUpVisitUseCase } from "../../../../domain/ports/in/follow-up-visits/create-follow-up-visit.js";
import type { GetFollowUpVisitUseCase } from "../../../../domain/ports/in/follow-up-visits/get-follow-up-visit.js";
import type { ListFollowUpVisitsUseCase } from "../../../../domain/ports/in/follow-up-visits/list-follow-up-visits.js";
import type { UpdateFollowUpVisitUseCase } from "../../../../domain/ports/in/follow-up-visits/update-follow-up-visit.js";
import type { LoginUseCase } from "../../../../domain/ports/in/auth/login.js";
import type { LogoutUseCase } from "../../../../domain/ports/in/auth/logout.js";
import type { RefreshTokenUseCase } from "../../../../domain/ports/in/auth/refresh-token.js";
import type { VerifyTokenUseCase } from "../../../../domain/ports/in/auth/verify-token.js";
import type { GetAuthUserUseCase } from "../../../../domain/ports/in/auth/get-auth-user.js";
import type { CreateRoleUseCase } from "../../../../domain/ports/in/roles/create-role.js";
import type { DeleteRoleUseCase } from "../../../../domain/ports/in/roles/delete-role.js";
import type { GetRoleUseCase } from "../../../../domain/ports/in/roles/get-role.js";
import type { ListRolesUseCase } from "../../../../domain/ports/in/roles/list-roles.js";
import type { UpdateRoleUseCase } from "../../../../domain/ports/in/roles/update-role.js";
import type { CreateUserUseCase } from "../../../../domain/ports/in/users/create-user.js";
import type { DeleteUserUseCase } from "../../../../domain/ports/in/users/delete-user.js";
import type { GetUserUseCase } from "../../../../domain/ports/in/users/get-user.js";
import type { ListUsersUseCase } from "../../../../domain/ports/in/users/list-users.js";
import type { UpdateUserUseCase } from "../../../../domain/ports/in/users/update-user.js";
import type { CreateProductUseCase } from "../../../../domain/ports/in/products/create-product.js";
import type { DeleteProductUseCase } from "../../../../domain/ports/in/products/delete-product.js";
import type { GetProductUseCase } from "../../../../domain/ports/in/products/get-product.js";
import type { ListProductsUseCase } from "../../../../domain/ports/in/products/list-products.js";
import type { UpdateProductUseCase } from "../../../../domain/ports/in/products/update-product.js";
import type { CreateManufacturerUseCase } from "../../../../domain/ports/in/manufacturers/create-manufacturer.js";
import type { DeleteManufacturerUseCase } from "../../../../domain/ports/in/manufacturers/delete-manufacturer.js";
import type { GetManufacturerUseCase } from "../../../../domain/ports/in/manufacturers/get-manufacturer.js";
import type { ListManufacturersUseCase } from "../../../../domain/ports/in/manufacturers/list-manufacturers.js";
import type { UpdateManufacturerUseCase } from "../../../../domain/ports/in/manufacturers/update-manufacturer.js";
import type { CreateConditionReferenceUseCase } from "../../../../domain/ports/in/condition-references/create-condition-reference.js";
import type { DeleteConditionReferenceUseCase } from "../../../../domain/ports/in/condition-references/delete-condition-reference.js";
import type { GetConditionReferenceUseCase } from "../../../../domain/ports/in/condition-references/get-condition-reference.js";
import type { ListConditionReferencesUseCase } from "../../../../domain/ports/in/condition-references/list-condition-references.js";
import type { UpdateConditionReferenceUseCase } from "../../../../domain/ports/in/condition-references/update-condition-reference.js";
import type { CreateProcedureReferenceUseCase } from "../../../../domain/ports/in/procedure-references/create-procedure-reference.js";
import type { DeleteProcedureReferenceUseCase } from "../../../../domain/ports/in/procedure-references/delete-procedure-reference.js";
import type { GetProcedureReferenceUseCase } from "../../../../domain/ports/in/procedure-references/get-procedure-reference.js";
import type { ListProcedureReferencesUseCase } from "../../../../domain/ports/in/procedure-references/list-procedure-references.js";
import type { UpdateProcedureReferenceUseCase } from "../../../../domain/ports/in/procedure-references/update-procedure-reference.js";

export type FastifyRestServerDeps = {
  createPatientService: CreatePatientUseCase;
  deletePatientService: DeletePatientUseCase;
  getPatientService: GetPatientUseCase;
  listPatientsService: ListPatientsUseCase;
  updatePatientService: UpdatePatientUseCase;

  createQueueService: CreateQueueUseCase;
  deleteQueueService: DeleteQueueUseCase;
  getQueueService: GetQueueUseCase;
  listQueuesService: ListQueuesUseCase;
  updateQueueService: UpdateQueueUseCase;

  getVisitService: GetVisitUseCase;
  listVisitsService: ListVisitsUseCase;

  createObservationService: CreateObservationUseCase;
  deleteObservationService: DeleteObservationUseCase;
  getObservationService: GetObservationUseCase;
  listObservationsService: ListObservationsUseCase;
  updateObservationService: UpdateObservationUseCase;
  updateObservationStatusService: UpdateObservationStatusUseCase;

  createConditionService: CreateConditionUseCase;
  deleteConditionService: DeleteConditionUseCase;
  getConditionService: GetConditionUseCase;
  listConditionsService: ListConditionsUseCase;
  updateConditionService: UpdateConditionUseCase;

  createProcedureService: CreateProcedureUseCase;
  deleteProcedureService: DeleteProcedureUseCase;
  getProcedureService: GetProcedureUseCase;
  listProceduresService: ListProceduresUseCase;
  updateProcedureService: UpdateProcedureUseCase;

  createFollowUpVisitService: CreateFollowUpVisitUseCase;
  getFollowUpVisitService: GetFollowUpVisitUseCase;
  listFollowUpVisitsService: ListFollowUpVisitsUseCase;
  updateFollowUpVisitService: UpdateFollowUpVisitUseCase;

  loginService: LoginUseCase;
  logoutService: LogoutUseCase;
  refreshService: RefreshTokenUseCase;
  verifyTokenService: VerifyTokenUseCase;
  getAuthUserService: GetAuthUserUseCase;
  cookieSecure: boolean;
  refreshTokenTtlSeconds: number;

  createRoleService: CreateRoleUseCase;
  deleteRoleService: DeleteRoleUseCase;
  getRoleService: GetRoleUseCase;
  listRolesService: ListRolesUseCase;
  updateRoleService: UpdateRoleUseCase;

  createUserService: CreateUserUseCase;
  deleteUserService: DeleteUserUseCase;
  getUserService: GetUserUseCase;
  listUsersService: ListUsersUseCase;
  updateUserService: UpdateUserUseCase;

  createProductService: CreateProductUseCase;
  deleteProductService: DeleteProductUseCase;
  getProductService: GetProductUseCase;
  listProductsService: ListProductsUseCase;
  updateProductService: UpdateProductUseCase;

  createManufacturerService: CreateManufacturerUseCase;
  deleteManufacturerService: DeleteManufacturerUseCase;
  getManufacturerService: GetManufacturerUseCase;
  listManufacturersService: ListManufacturersUseCase;
  updateManufacturerService: UpdateManufacturerUseCase;

  createConditionReferenceService: CreateConditionReferenceUseCase;
  deleteConditionReferenceService: DeleteConditionReferenceUseCase;
  getConditionReferenceService: GetConditionReferenceUseCase;
  listConditionReferencesService: ListConditionReferencesUseCase;
  updateConditionReferenceService: UpdateConditionReferenceUseCase;

  createProcedureReferenceService: CreateProcedureReferenceUseCase;
  deleteProcedureReferenceService: DeleteProcedureReferenceUseCase;
  getProcedureReferenceService: GetProcedureReferenceUseCase;
  listProcedureReferencesService: ListProcedureReferencesUseCase;
  updateProcedureReferenceService: UpdateProcedureReferenceUseCase;
};
