import { User } from "../entities/user.entity";

export abstract class IUserRepository {
    abstract save(user: User): Promise<User>;
    abstract findByUsername(username: string): Promise<User | null>;
}