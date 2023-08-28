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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_model_1 = require("./model/users.model");
const typeorm_2 = require("typeorm");
const query_statement_1 = require("../utils/query.statement");
const error_service_1 = require("../utils/error/error.service");
const error_code_1 = require("../utils/error/error.code");
const users_role_type_1 = require("./enum/users.role.type");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = exports.UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async createUser(data) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
        const email = await this.usersRepository.findOne({
            where: { email: data.email },
        });
        if (email) {
            throw new error_service_1.ErrorService({
                error: error_code_1.ErrorCodes.EMAIL_ALREADY_IN_USE,
            });
        }
        return this.usersRepository.save(Object.assign(Object.assign({}, data), { password: hashedPassword }));
    }
    async saveUser(data) {
        const email = await this.usersRepository.findOne({
            where: { email: data.email },
        });
        if (email) {
            throw new error_service_1.ErrorService({
                error: error_code_1.ErrorCodes.EMAIL_ALREADY_IN_USE,
            });
        }
        return this.usersRepository.save(data);
    }
    async getAll() {
        return this.usersRepository.find({
            where: { role: (0, typeorm_2.Not)(users_role_type_1.UsersRoleType.SUPER_USER) },
        });
    }
    async editUser(data) {
        const { id } = data, rest = __rest(data, ["id"]);
        return this.usersRepository
            .createQueryBuilder()
            .update(users_model_1.UsersModel)
            .set(Object.assign({}, rest))
            .where((0, query_statement_1.generateQueryStatement)({ id }), { id })
            .returning("*")
            .execute()
            .then((response) => {
            if (response.raw[0]) {
                return response.raw[0];
            }
            throw response;
        })
            .catch((err) => {
            throw new error_service_1.ErrorService({
                error: error_code_1.ErrorCodes.INCORRECT_CREDENTIALS,
            });
        });
    }
    async checkUser(data) {
        console.log('data = ', data);
        let { email, password } = data;
        email = email === null || email === void 0 ? void 0 : email.toLowerCase();
        const user = await this.usersRepository.findOne({
            where: { email, password },
        });
        if (!user) {
            throw new error_service_1.ErrorService({
                error: error_code_1.ErrorCodes.INCORRECT_CREDENTIALS,
            });
        }
        return user;
    }
    async findUserByIdAndRole(data) {
        const { id, role } = data;
        return this.usersRepository.findOne({ where: { id, role } });
    }
    async findUserByUsername(data) {
        const { email } = data;
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new error_service_1.ErrorService({
                error: error_code_1.ErrorCodes.INCORRECT_CREDENTIALS,
            });
        }
        return user;
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_model_1.UsersModel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map