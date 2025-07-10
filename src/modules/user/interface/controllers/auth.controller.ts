import { Body, Controller, Post } from "@nestjs/common";
import { LoginuserDto } from "../../application/dto/login-user.dto";
import { RegisterUserDto } from "../../application/dto/register-user.dto";
import { LoginUserUseCase } from "../../application/use-cases/login-user.use-case";
import { RegisterUserUseCase } from "../../application/use-cases/register-user.use-case";

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