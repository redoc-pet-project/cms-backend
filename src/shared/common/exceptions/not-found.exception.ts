import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFound extends HttpException {
    constructor(message: string = "Not found") {
        super(message, HttpStatus.NOT_FOUND)
    }
}