export class InfrastructureError extends Error {}

export class ExternalServiceError extends InfrastructureError {}

export class DatabaseError extends ExternalServiceError {}

export class PatientsRepositoryError extends ExternalServiceError {}
export class QueuesRepositoryError extends ExternalServiceError {}
export class VisitsRepositoryError extends ExternalServiceError {}
export class ObservationsRepositoryError extends ExternalServiceError {}
export class ConditionsRepositoryError extends ExternalServiceError {}
export class ProceduresRepositoryError extends ExternalServiceError {}
export class FollowUpVisitsRepositoryError extends ExternalServiceError {}
export class UsersRepositoryError extends ExternalServiceError {}
export class RolesRepositoryError extends ExternalServiceError {}
export class RefreshTokensRepositoryError extends ExternalServiceError {}
export class ProductsRepositoryError extends ExternalServiceError {}
export class ManufacturersRepositoryError extends ExternalServiceError {}
export class ConditionReferencesRepositoryError extends ExternalServiceError {}
export class ProcedureReferencesRepositoryError extends ExternalServiceError {}
export class SatuSehatError extends ExternalServiceError {}
export class CacheError extends ExternalServiceError {}
export class AuthError extends ExternalServiceError {}
