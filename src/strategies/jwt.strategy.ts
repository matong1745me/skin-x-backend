import { UserPayloadDto } from '@/dto/user-payload.dto';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'skin-x',
    });
  }

  async validate(payload: any): Promise<UserPayloadDto> {
    return {
      id: payload.sub,
      username: payload.username,
      displayName: payload.displayName,
    };
  }
}
