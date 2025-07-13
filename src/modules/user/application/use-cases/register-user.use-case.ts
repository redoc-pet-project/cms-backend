import { Injectable, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

import { User } from "~modules/user/domain/entities/user.entity";
import { IUserRepository } from "~modules/user/domain/repositories/user.repository";
import { BadRequest } from "~shared/common/exceptions/bad-request.exception";
import { Conflict } from "~shared/common/exceptions/conflict.exception";

import { UserDto } from "../dto/user.dto";

@Injectable()
export class RegisterUserUseCase {
    constructor(private readonly userRepo: IUserRepository, private loggerService: Logger) { }

    async execute(data: { displayName: string; username: string; password: string }): Promise<UserDto> {
        try {
            const existinguser = await this.userRepo.findByUsername(data.username);
            if (existinguser) throw new Conflict();

            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = User.create({ ...data, password: hashedPassword });

            const savedUser = await this.userRepo.save(user);

            this.loggerService.log('User registered successfully')
            return UserDto.create(savedUser)
        } catch (err) {
            this.loggerService.error(err);
            if (err instanceof Conflict) {
                throw err;
            }
            throw new BadRequest()
        }
    }
}