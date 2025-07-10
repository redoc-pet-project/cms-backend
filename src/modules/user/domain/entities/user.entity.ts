import { v4 } from "uuid";

export class User {
    constructor(public readonly id: string, public username: string, public password: string, public displayName?: string) { }

    static create(props: Omit<User, 'id'>): User {
        return new User(v4(), props.username, props.password, props.displayName)
    }
}