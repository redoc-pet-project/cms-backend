import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { get } from 'lodash';
import { Unauthorized } from '~shared/common/exceptions/unauthorized.exception';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const timestamp = new Date().toISOString();

    let status = HttpStatus.BAD_REQUEST;
    let message = 'Bad Request';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (status === HttpStatus.UNAUTHORIZED) {
        message = 'Unauthorized';
      }
    } else if (
      exception instanceof UnauthorizedException ||
      exception instanceof Unauthorized
    ) {
      message = 'Unauthorized';
      status = HttpStatus.UNAUTHORIZED;
    }
    const requestId = get<Request, 'requestId'>(request, 'requestId') || '';

    response.status(status).json({
      statusCode: status,
      requestId: requestId,
      path: request.url,
      timestamp,
      message,
    });
  }
}
