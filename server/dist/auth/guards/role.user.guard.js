"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
let UserRoleGuard = exports.UserRoleGuard = class UserRoleGuard extends (0, passport_1.AuthGuard)("jwt") {
    constructor(roles, reflector) {
        super();
        this.roles = roles;
        this.reflector = reflector;
    }
    async canActivate(context) {
        await super.canActivate(context);
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return this.validateRequest(ctx);
    }
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        return req;
    }
    validateRequest(context) {
        const ctx = context.getContext().req;
        const { user } = ctx;
        if (!this.roles)
            return false;
        return this.roles.some((role) => {
            return role === user.role;
        });
    }
};
exports.UserRoleGuard = UserRoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Array, core_1.Reflector])
], UserRoleGuard);
//# sourceMappingURL=role.user.guard.js.map