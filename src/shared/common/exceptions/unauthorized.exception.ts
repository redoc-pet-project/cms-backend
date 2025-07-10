import { HttpException, HttpStatus } from "@nestjs/common";

export class Unauthorized extends HttpException {
    constructor(message: string = "Unauthorized") {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}