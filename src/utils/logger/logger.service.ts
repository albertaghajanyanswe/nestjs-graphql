import { ConsoleLogger, Injectable } from "@nestjs/common";

@Injectable()
export class MyLogger extends ConsoleLogger {
  log(message: any) {
    super.log(message);
  }
  error(message: string) {
    super.error(message);
  }
  warn(message: string) {
    super.warn(message);
  }
  debug(message: string) {
    super.debug(message);
  }
  verbose(message: string) {
    super.verbose(message);
  }
}
