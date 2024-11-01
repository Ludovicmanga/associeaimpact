import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntrepreneurialExperience } from 'src/types/enums';
import * as bcrypt from 'bcrypt';
import { MailService } from '@sendgrid/mail';

const sgMail = new MailService();
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

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
        isPaying: false,
      },
    })

    return createdUser;
  }

  async sendVerificationEmail(user: { email: string, password: string, name: string, entrepreneurialExperience: EntrepreneurialExperience }) {
    const token = await this.jwtService.sign(user);

    console.log('before');

    const msg = {
      to: user.email,
      from: 'ludovic.mangaj@gmail.com',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      template_id: process.env.VERIFY_EMAIL_TEMPLATE_ID,
      dynamic_template_data: {
          link: process.env.FRONTEND_URL + "/verify-email?token=" + token,
          firstName: user.name
      }
    }
    const sentRes = await sgMail.send(msg);

    console.log('afterr');


   return sentRes;
   
  }

   async verifyEmail(token: string) {
    const userDecoded = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET
    });
    if (userDecoded) {
      const createdUser = await this.signUp(userDecoded);
      if (createdUser) {
        return {token: await this.login(createdUser),
          user: createdUser
        }
      }
    }
  } 
}