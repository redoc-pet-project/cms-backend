import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ClsModule } from 'nestjs-cls';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CategoryModule } from '~modules/category/category.module';
import { UserModule } from '~modules/user/user.module';
import { VendorModule } from '~modules/vendor/vendor.module';
import { RequestContextMiddleware } from './shared/middlewares/request-context.middleware';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
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
      inject: [Logger],
      useFactory: (logger: Logger): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root_password',
        database: 'proxies',
        entities: [__dirname + '/modules/**/infrastructure/entities/*.orm-entity.{ts,js}'],
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        logging: true,
      }),
    }),
    UserModule,
    VendorModule,
    CategoryModule,
    SharedModule
  ],
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
