import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class UserRoleGuard extends AuthGuard("jwt") {
  constructor(public roles: string[], private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const ctx = GqlExecutionContext.create(context);
    return this.validateRequest(ctx);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req;
  }

  validateRequest(context: GqlExecutionContext) {
    const ctx = context.getContext().req;
    const { user } = ctx;
    if (!this.roles) return false;
    return this.roles.some((role) => {
      return role === user.role;
    });
  }
}
