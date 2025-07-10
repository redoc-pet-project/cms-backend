import { Injectable, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Unauthorized } from "../../../../shared/common/exceptions/unauthorized.exception";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { ITokenService } from "../../domain/services/token.service";
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