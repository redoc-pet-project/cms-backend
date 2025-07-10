import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        return next.handle().pipe(
            map(data => {
                return {
                    statusCode: response.statusCode || 200,
                    message: 'success',
                    timestamp: new Date().toISOString(),
                    requestId: ctx.getRequest()['requestId'],
                    data
                }
            })
        )
    }
}