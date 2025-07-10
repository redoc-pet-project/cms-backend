import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    constructor(private clsService: ClsService) { }

    use(req: Request, res: Response, next: NextFunction) {
        let requestId = req.headers['x-request-id'] as string;
        if (!requestId || typeof requestId !== 'string') {
            requestId = uuidv4();
        }

        req['requestId'] = requestId;
        res.setHeader('X-Request-Id', requestId);

        this.clsService.set('requestId', requestId);
        next();
    }
}
