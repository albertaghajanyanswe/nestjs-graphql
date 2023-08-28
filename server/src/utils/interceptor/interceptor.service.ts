import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { MyLogger } from "../logger/logger.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger: MyLogger;
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgs();
    const reqBody = req[1];
    const api = req[3]?.fieldName;
    this.logger = new MyLogger();
    this.logger.log("Before reaching  the handler");
    this.logger.log(api);
    this.logger.log(reqBody);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap((resData) =>
          this.logger.log(
            `${new Date(Date.now())} - ${JSON.stringify(resData)}`
          )
        )
      );
  }
}
