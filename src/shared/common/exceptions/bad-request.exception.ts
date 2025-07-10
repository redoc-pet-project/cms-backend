import { HttpException, HttpStatus } from "@nestjs/common";

export class BadRequest extends HttpException {

    constructor(message: string = 'Bad Request') {
        super(message, HttpStatus.BAD_REQUEST);
    }

}