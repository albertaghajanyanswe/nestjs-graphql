import { ConsoleLogger } from "@nestjs/common";
export declare class MyLogger extends ConsoleLogger {
    log(message: any): void;
    error(message: string): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
