import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntrepreneurialExperience } from 'src/types/enums';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private prismaService: PrismaService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
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
    const createdUser = await this.prismaService.user.create({
      data: {
        email: args.email,
        name: args.name,
        password: args.password,
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