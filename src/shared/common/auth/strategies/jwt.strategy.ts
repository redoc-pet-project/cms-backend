/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ClsService } from 'nestjs-cls';
import { EnvConfig } from '~shared/configs/env.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly cls: ClsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: EnvConfig.get('JWT_SECRET'),
    });
  }

  validate(payload: { userId: string }) {
    this.cls.set('userId', payload.userId);
    return payload;
  }
}
