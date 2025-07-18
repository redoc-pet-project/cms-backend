import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { EnvConfig } from '~shared/configs/env.config';
config();
export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: EnvConfig.get('DB_HOST'),
  port: Number(EnvConfig.get('DB_PORT')),
  username: EnvConfig.get('DB_USER'),
  password: EnvConfig.get('DB_PASSWORD'),
  database: EnvConfig.get('DB_NAME'),
  entities: [
    __dirname +
      '/../../modules/**/infrastructure/entities/*.orm-entity.{ts,js}',
  ],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
};
