import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalHttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { EnvConfig } from '~shared/configs/env.config';
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback: any) => {
      const allowedOrigins = EnvConfig.get('CLIENT_ORIGIN').split(',');
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  await app.listen(Number(EnvConfig.get('PORT') || 3000));
}
bootstrap();
