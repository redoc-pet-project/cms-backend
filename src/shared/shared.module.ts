import { Global, Logger, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { RequestLoggerService } from './logger/request-logger.service';
import { JwtAuthGuard } from '~shared/common/auth/guard/jwt-auth.guard';
import { JwtStrategy } from '~shared/common/auth/strategies/jwt.strategy';

@Global()
@Module({
  imports: [ClsModule.forFeature()],
  providers: [
    {
      provide: Logger,
      useClass: RequestLoggerService,
    },
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [Logger, JwtAuthGuard],
})
export class SharedModule {}
