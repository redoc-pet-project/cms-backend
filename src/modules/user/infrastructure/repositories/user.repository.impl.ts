import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.repository";

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
    private users = new Map<string, User>();

    async save(user: User): Promise<User> {
        this.users.set(user.username, user);
        return user;
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.users.get(username) || null;
    }

}