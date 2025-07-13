import { User } from "~modules/user/domain/entities/user.entity";


export class UserDto {
    constructor(public readonly id: string, public username: string, public displayName?: string) { }

    static create(user: User): UserDto {
        return new UserDto(user.id, user.username, user.displayName);
    }
}