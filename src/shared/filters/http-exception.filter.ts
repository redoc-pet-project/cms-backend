import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const timestamp = new Date().toISOString();

        let status = HttpStatus.BAD_REQUEST;
        let message = 'Bad Request';
        let error: any = null;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            if (typeof res === 'string') {
                message = res;
            }
        }

        response.status(status).json({
            statusCode: status,
            requestId: request['requestId'],
            timestamp,
            message
        })
    }
}