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
exports.UsersModel = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const users_role_type_1 = require("../enum/users.role.type");
let UsersModel = exports.UsersModel = class UsersModel {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UsersModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, typeorm_1.Generated)("uuid"),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersModel.prototype, "uuid", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], UsersModel.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], UsersModel.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)("text", { unique: true }),
    __metadata("design:type", String)
], UsersModel.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)("text", { unique: true }),
    __metadata("design:type", String)
], UsersModel.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], UsersModel.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsEnum)(users_role_type_1.UsersRoleType),
    __metadata("design:type", String)
], UsersModel.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], UsersModel.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], UsersModel.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.DeleteDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], UsersModel.prototype, "deletedAt", void 0);
exports.UsersModel = UsersModel = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], UsersModel);
//# sourceMappingURL=users.model.js.map