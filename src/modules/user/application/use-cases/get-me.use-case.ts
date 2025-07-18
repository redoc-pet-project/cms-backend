import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { UserDto } from '~modules/user/application/dto/user.dto';
import { IUserRepository } from '~modules/user/domain/repositories/user.repository';
import { Unauthorized } from '~shared/common/exceptions/unauthorized.exception';

@Injectable()
export class GetMeUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly clsService: ClsService,
  ) {}

  async execute(): Promise<UserDto> {
    const user = await this.userRepo.findByUserId(
      this.clsService.get('userId'),
    );
    if (!user) {
      throw new Unauthorized();
    }

    return UserDto.create(user);
  }
}
