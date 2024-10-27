import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntrepreneurialExperience } from 'src/types/enums';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private prismaService: PrismaService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user?.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(args: { email: string, password: string, name: string, entrepreneurialExperience: EntrepreneurialExperience }) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(args.password, saltOrRounds);

    const createdUser = await this.prismaService.user.create({
      data: {
        email: args.email,
        name: args.name,
        password: hash,
        entrepreneurialExperience: args.entrepreneurialExperience || EntrepreneurialExperience.neverFounder,
        isPaying: false
      }
    })

    if (createdUser) {
      return {token: await this.login(createdUser),
        user: createdUser
      }
    }

  }
}