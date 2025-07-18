import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginuserDto } from '~modules/user/application/dto/login-user.dto';
import { RegisterUserDto } from '~modules/user/application/dto/register-user.dto';
import { GetMeUseCase } from '~modules/user/application/use-cases/get-me.use-case';
import { LoginUserUseCase } from '~modules/user/application/use-cases/login-user.use-case';
import { RegisterUserUseCase } from '~modules/user/application/use-cases/register-user.use-case';

@Controller({
  path: 'auth',
  version: ['1'],
})
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUserUseCase,
    private readonly getMeUseCase: GetMeUseCase,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.registerUseCase.execute(dto);
  }

  @Post('login')
  login(@Body() dto: LoginuserDto) {
    return this.loginUseCase.execute(dto.username, dto.password);
  }

  @Get('me')
  getMe() {
    return this.getMeUseCase.execute();
  }
}
