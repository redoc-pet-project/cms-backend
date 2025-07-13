import { Injectable, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { IUserRepository } from "~modules/user/domain/repositories/user.repository";
import { ITokenService } from "~modules/user/domain/services/token.service";
import { Unauthorized } from "~shared/common/exceptions/unauthorized.exception";

import { JwtTokenPayloadDto } from "../dto/jwt-token.dto";

@Injectable()
export class LoginUserUseCase {
    constructor(
        private readonly userRepo: IUserRepository,
        private readonly tokenService: ITokenService<JwtTokenPayloadDto>,
        private readonly loggerService: Logger
    ) { }

    async execute(username: string, password: string): Promise<{ token: string }> {
        const user = await this.userRepo.findByUsername(username);
        if (!user) throw new Unauthorized();

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Unauthorized();

        const token = this.tokenService.sign({ userId: user.id, });
        return { token };
    }
}