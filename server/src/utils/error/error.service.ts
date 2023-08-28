import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-errors';
import { MyLogger } from '../logger/logger.service';
import { collectMessage } from './collect.message';

type ErrorMessage = {
  errorCode: string;
  message: string;
};
@Injectable()
export class ErrorService extends ApolloError {
  errorCode: string;
  options: string[];
  logger: MyLogger;

  constructor({
    error,
    status = 400,
    options = [],
  }: {
    error: ErrorMessage;
    status?: number;
    options?: string[];
    ignoreSentry?: boolean;
  }) {
    const message = collectMessage(error.message, options);
    super(message, error.errorCode);
    this.extensions.status = status;
    this.logger = new MyLogger();
    this.options = options;
    this.logger.error(message);
  }
}
