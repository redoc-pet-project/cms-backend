import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { UserModule } from './modules/user/user.module';
import { RequestContextMiddleware } from './shared/middlewares/request-context.middleware';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [UserModule, SharedModule, ClsModule.forRoot({
    middleware: {
      mount: true,
      setup: (cls, req) => {
        cls.set('requestId', req.headers['X-Request-Id']);
      },
    },
  }),],
  controllers: [],
  providers: [

  ],
  exports: [SharedModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*')
  }
}
