export abstract class ITokenService<T> {
    abstract sign(payload: T): string;
    abstract verify(token: string): T;
}
