import { env } from '../config/env.config';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestExceptionFilter extends BaseExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    if (env.NODE_ENV === 'development') {
      return super.catch(exception, host);
    }

    const internalError = new InternalServerErrorException(
      'Ocorreu um erro interno no servidor.',
    );
    return super.catch(internalError, host);
  }
}
