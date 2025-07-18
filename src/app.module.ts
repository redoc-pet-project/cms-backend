import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ClsModule } from 'nestjs-cls';
import { CategoryModule } from '~modules/category/category.module';
import { ProxyModule } from '~modules/proxy/proxy.module';
import { UserModule } from '~modules/user/user.module';
import { VendorModule } from '~modules/vendor/vendor.module';
import { TypeOrmConfig } from '~shared/configs/typeorm.config';
import { RequestContextMiddleware } from './shared/middlewares/request-context.middleware';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set('requestId', req.headers['X-Request-Id']);
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (): TypeOrmModuleOptions => TypeOrmConfig,
    }),
    UserModule,
    VendorModule,
    CategoryModule,
    ProxyModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
  exports: [SharedModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
