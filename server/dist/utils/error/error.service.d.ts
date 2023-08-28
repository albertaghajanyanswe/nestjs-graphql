import { ApolloError } from 'apollo-server-errors';
import { MyLogger } from '../logger/logger.service';
type ErrorMessage = {
    errorCode: string;
    message: string;
};
export declare class ErrorService extends ApolloError {
    errorCode: string;
    options: string[];
    logger: MyLogger;
    constructor({ error, status, options, }: {
        error: ErrorMessage;
        status?: number;
        options?: string[];
        ignoreSentry?: boolean;
    });
}
export {};
