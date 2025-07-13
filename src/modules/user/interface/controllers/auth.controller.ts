import { Body, Controller, Post } from "@nestjs/common";
import { LoginuserDto } from "~modules/user/application/dto/login-user.dto";
import { RegisterUserDto } from "~modules/user/application/dto/register-user.dto";
import { LoginUserUseCase } from "~modules/user/application/use-cases/login-user.use-case";
import { RegisterUserUseCase } from "~modules/user/application/use-cases/register-user.use-case";

@Controller('auth')
export class AuthController {
    constructor(private readonly registerUseCase: RegisterUserUseCase, private loginUseCase: LoginUserUseCase) { }

    @Post('register')
    register(@Body() dto: RegisterUserDto) {
        return this.registerUseCase.execute(dto);
    }

    @Post('login')
    login(@Body() dto: LoginuserDto) {
        return this.loginUseCase.execute(dto.username, dto.password);
    }
}