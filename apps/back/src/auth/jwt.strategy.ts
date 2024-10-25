import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOneByEmail(payload.email);
    return { ...user };
  }

  private static extractJWT(req) {
    if (
      req.cookies &&
      req.cookies.tai_user_token &&
      req.cookies.tai_user_token.length > 0
    ) {
      return req.cookies.tai_user_token;
    }
    return null;
  }
}