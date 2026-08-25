import type { FastifyRequest, FastifyReply } from "fastify";
import type { AuthUser } from "@simk/contracts";
import type { Permission } from "../../../../../domain/permissions.js";
import type { GetAuthUserUseCase } from "../../../../../domain/ports/in/auth/get-auth-user.js";
import type { VerifyTokenUseCase } from "../../../../../domain/ports/in/auth/verify-token.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: AuthUser;
  }
}

export type AuthMiddlewareDeps = {
  verifyTokenService: VerifyTokenUseCase;
  getAuthUserService: GetAuthUserUseCase;
};

export function createAuthMiddleware(deps: AuthMiddlewareDeps) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const header = req.headers.authorization;
    if (!header) {
      return reply.status(401).send({
        statusCode: 401,
        error: "UNAUTHORIZED",
        message: "Missing authorization header",
      });
    }

    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
      return reply.status(401).send({
        statusCode: 401,
        error: "UNAUTHORIZED",
        message: "Invalid authorization header format",
      });
    }

    const { userId } = await deps.verifyTokenService.verifyToken({ accessToken: token });
    req.user = await deps.getAuthUserService.getAuthUser({ userId });
  };
}

export function requirePermission(permission: Permission) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    if (!req.user) {
      return reply.status(401).send({
        statusCode: 401,
        error: "UNAUTHORIZED",
        message: "Authentication required",
      });
    }

    if (!req.user.role.permissions.includes(permission)) {
      return reply.status(403).send({
        statusCode: 403,
        error: "FORBIDDEN",
        message: `Missing required permission '${permission}'`,
      });
    }
  };
}
