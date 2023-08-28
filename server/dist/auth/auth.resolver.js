"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_dto_1 = require("./dto/auth.dto");
const auth_login_input_1 = require("./input/auth.login.input");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const bcrypt = __importStar(require("bcrypt"));
const error_service_1 = require("../utils/error/error.service");
const error_code_1 = require("../utils/error/error.code");
let AuthResolver = exports.AuthResolver = class AuthResolver {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async login(authLogin) {
        const user = await this.authService.validateUser(authLogin);
        const token = await this.authService.generateAuthToken(user);
        return {
            token,
            user,
        };
    }
    async defaultLogin(authLogin) {
        const user = await this.authService.validateUserLoginPassword(authLogin);
        const validPassword = await bcrypt.compare(authLogin.password, user.password);
        if (!validPassword) {
            throw new error_service_1.ErrorService({
                error: error_code_1.ErrorCodes.INCORRECT_CREDENTIALS,
            });
        }
        const token = await this.authService.generateAuthToken(user);
        return {
            token,
            user,
        };
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => auth_dto_1.AuthResponseDTO),
    __param(0, (0, graphql_1.Args)("authLogin")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_input_1.AuthLogin]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_dto_1.AuthResponseDTO),
    __param(0, (0, graphql_1.Args)("authLogin")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_input_1.AuthLogin]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "defaultLogin", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(0, (0, common_1.Inject)(users_service_1.UsersService)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map