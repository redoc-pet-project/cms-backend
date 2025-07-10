import { HttpException, HttpStatus } from "@nestjs/common";

export class Conflict extends HttpException {
    constructor(message: string = 'Conflict') {
        super(message, HttpStatus.CONFLICT)
    }
}
