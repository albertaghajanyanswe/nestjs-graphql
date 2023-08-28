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
exports.ErrorService = void 0;
const common_1 = require("@nestjs/common");
const apollo_server_errors_1 = require("apollo-server-errors");
const logger_service_1 = require("../logger/logger.service");
const collect_message_1 = require("./collect.message");
let ErrorService = exports.ErrorService = class ErrorService extends apollo_server_errors_1.ApolloError {
    constructor({ error, status = 400, options = [], }) {
        const message = (0, collect_message_1.collectMessage)(error.message, options);
        super(message, error.errorCode);
        this.extensions.status = status;
        this.logger = new logger_service_1.MyLogger();
        this.options = options;
        this.logger.error(message);
    }
};
exports.ErrorService = ErrorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ErrorService);
//# sourceMappingURL=error.service.js.map