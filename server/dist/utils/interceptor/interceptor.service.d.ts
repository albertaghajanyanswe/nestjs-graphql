import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { MyLogger } from "../logger/logger.service";
export declare class LoggingInterceptor implements NestInterceptor {
    logger: MyLogger;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
