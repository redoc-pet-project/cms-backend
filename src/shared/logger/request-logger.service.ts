import { Injectable, Logger, LoggerService as NestLoggerService } from '@nestjs/common';
import * as JSONC from 'circular-json';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class RequestLoggerService extends Logger implements NestLoggerService {
    constructor(private readonly cls: ClsService) {
        super();
    }

    private format(message: any): string {
        const requestId = this.cls.get('requestId');
        if (typeof message === 'string') { return requestId ? `[${requestId}] ${message}` : `[] ${message}`; }
        console.log(JSONC.stringify(message), message)
        const data = JSONC.stringify({ data: message });

        return requestId ? `[${requestId}] ${data}` : `[] ${data}`;
    }


    log(message: any, context?: string) {
        if (context) {
            super.log(this.format(message), context);
            return;
        }
        super.log(this.format(message));
    }

    error(message: any, trace?: string, context?: string) {
        if (context) {
            super.error(this.format(message), trace, context);
            return;
        }
        if (trace) {
            super.error(this.format(message), trace);
            return;
        }
        super.error(this.format(message));
    }

    warn(message: any, context?: string) {
        if (context) {
            super.warn(this.format(message), context);
            return
        }

        super.warn(this.format(message));
    }

    debug(message: any, context?: string) {
        if (context) {
            super.debug(this.format(message), context);
            return;
        }
        super.debug?.(this.format(message));
    }

    verbose(message: any, context?: string) {
        if (context) {
            super.verbose(this.format(message), context);
            return;
        }
        super.verbose?.(this.format(message));
    }



}
