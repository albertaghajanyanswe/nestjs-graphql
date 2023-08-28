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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("./users.service");
const add_usres_input_1 = require("./input/add.usres.input");
const users_dto_1 = require("./dto/users.dto");
const users_model_1 = require("./model/users.model");
const edit_user_input_1 = require("./input/edit.user.input");
const jwt_auth_guard_1 = require("../auth/guards/jwt.auth.guard");
const current_user_guard_1 = require("../auth/guards/current.user.guard");
const users_role_type_1 = require("./enum/users.role.type");
const error_service_1 = require("../utils/error/error.service");
const error_code_1 = require("../utils/error/error.code");
let UsersResolver = exports.UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createUser(data) {
        return this.usersService.createUser(data);
    }
    async addUser(data, { id, role }) {
        const user = await this.usersService.findUserByIdAndRole({ id, role });
        if (user &&
            (user.role === users_role_type_1.UsersRoleType.ADMIN ||
                user.role === users_role_type_1.UsersRoleType.SUPER_USER)) {
            return this.usersService.saveUser(data);
        }
        throw new error_service_1.ErrorService({
            error: error_code_1.ErrorCodes.FORBIDDEN,
        });
    }
    async editUser(data, { id, role }) {
        const user = await this.usersService.findUserByIdAndRole({ id, role });
        if (user &&
            (user.role === users_role_type_1.UsersRoleType.ADMIN ||
                user.role === users_role_type_1.UsersRoleType.SUPER_USER)) {
            return this.usersService.editUser(data);
        }
        throw new error_service_1.ErrorService({
            error: error_code_1.ErrorCodes.FORBIDDEN,
        });
    }
    async fullName({ firstName, lastName }) {
        return `${firstName} ${lastName}`;
    }
    async getAllUsers({ id, role }) {
        const user = await this.usersService.findUserByIdAndRole({ id, role });
        if (user &&
            (user.role === users_role_type_1.UsersRoleType.ADMIN ||
                user.role === users_role_type_1.UsersRoleType.SUPER_USER)) {
            return this.usersService.getAll();
        }
        throw new error_service_1.ErrorService({
            error: error_code_1.ErrorCodes.FORBIDDEN,
        });
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => users_dto_1.UsersDTO),
    __param(0, (0, graphql_1.Args)("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_usres_input_1.UsersInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => users_dto_1.UsersDTO),
    __param(0, (0, graphql_1.Args)("user")),
    __param(1, (0, current_user_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_usres_input_1.UsersInput,
        users_model_1.UsersModel]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "addUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => users_dto_1.UsersDTO),
    __param(0, (0, graphql_1.Args)("user")),
    __param(1, (0, current_user_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_user_input_1.EditUserInput,
        users_model_1.UsersModel]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "editUser", null);
__decorate([
    (0, graphql_1.ResolveField)("fullName", () => String, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersModel]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "fullName", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [users_dto_1.UsersDTO]),
    __param(0, (0, current_user_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersModel]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getAllUsers", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)((of) => users_dto_1.UsersDTO),
    __param(0, (0, common_1.Inject)(users_service_1.UsersService)),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
//# sourceMappingURL=users.resolver.js.map