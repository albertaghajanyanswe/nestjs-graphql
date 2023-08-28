import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
declare const UserRoleGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class UserRoleGuard extends UserRoleGuard_base {
    roles: string[];
    private reflector;
    constructor(roles: string[], reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    getRequest(context: ExecutionContext): any;
    validateRequest(context: GqlExecutionContext): boolean;
}
export {};
