"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const logger_service_1 = require("../logger/logger.service");
let LoggingInterceptor = exports.LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        var _a;
        const req = context.getArgs();
        const reqBody = req[1];
        const api = (_a = req[3]) === null || _a === void 0 ? void 0 : _a.fieldName;
        this.logger = new logger_service_1.MyLogger();
        this.logger.log("Before reaching  the handler");
        this.logger.log(api);
        this.logger.log(reqBody);
        const now = Date.now();
        return next
            .handle()
            .pipe((0, rxjs_1.tap)((resData) => this.logger.log(`${new Date(Date.now())} - ${JSON.stringify(resData)}`)));
    }
};
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=interceptor.service.js.map