// modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUserUseCase } from './application/use-cases/login-user.use-case';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { IUserRepository } from './domain/repositories/user.repository';
import { ITokenService } from './domain/services/token.service';
import { UserOrmEntity } from './infrastructure/entities/user.orm-entity';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { TokenServiceImpl } from './infrastructure/services/token.service.impl';
import { AuthController } from './interface/controllers/auth.controller';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'ascsacwikdnwknd', // Move to env
            signOptions: { expiresIn: '1h' },
        }),
        TypeOrmModule.forFeature([UserOrmEntity])
    ],
    controllers: [AuthController],
    providers: [
        RegisterUserUseCase,
        LoginUserUseCase,
        {
            provide: IUserRepository,
            useClass: UserRepositoryImpl,
        },
        {
            provide: ITokenService,
            useClass: TokenServiceImpl
        }
    ],
})
export class UserModule { }
