import { Global, Logger, Module } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";
import { RequestLoggerService } from "./logger/request-logger.service";

@Global()
@Module({
    imports: [
        ClsModule.forFeature()
    ],
    providers: [{
        provide: Logger,
        useClass: RequestLoggerService,

    },],
    exports: [Logger]
})
export class SharedModule { }