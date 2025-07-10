import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtTokenPayloadDto } from "../../application/dto/jwt-token.dto";
import { ITokenService } from "../../domain/services/token.service";

@Injectable()
export class TokenServiceImpl implements ITokenService<JwtTokenPayloadDto> {
    constructor(private readonly jwtService: JwtService) { }
    sign(payload: JwtTokenPayloadDto): string {
        return this.jwtService.sign(payload)
    }
    verify(token: string): JwtTokenPayloadDto {
        return this.jwtService.verify(token)
    }
}