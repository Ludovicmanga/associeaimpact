import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalAuthGuard } from './local-auth.guard';
import { OAuth2Client } from 'google-auth-library';
import { JwtAuthGuard } from './jwt-auth.guard';
import { EntrepreneurialExperience } from 'src/types/enums';
import { error } from 'console';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private prismaService: PrismaService) {}

    @Post('sign-up')
    async signUp(@Request() req, @Response() res) {
      try {
        const { email, password, name, entrepreneurialExperience } = req.body;
        try {
          const response = await this.authService.signUp({ email, password, name, entrepreneurialExperience });
          if (response.token) {
            res.cookie('tai_user_token',response.token.access_token, { maxAge: 3600000, httpOnly: true });
            res.send(response.user);
          }
        } catch(e) {
          res.send({
            error: 'USER_ALREADY_EXISTS'
          })
        }
      } catch(e) {
        console.log(e)
      }
    }
    

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Response() res) {
      try {
        const token = await this.authService.login(req.user);
        if (token) {
          res.cookie('tai_user_token',token.access_token, { maxAge: 3600000, httpOnly: true });
          res.send(req.user);
        }
      } catch (e) {
        console.log(e, ' is the error!!');
      }
    }

    @Post('logout')
    async logout(@Request() req, @Response() res) {
      try {
        res.clearCookie("tai_user_token");
        res.end();
      } catch (e) {
        console.log(e, ' is the error!!');
      }
    }
  
    @Post('login-google')
    async loginWithGoogle(@Request() req, @Response() res) {
      const CLIENT_ID_GOOGLE = process.env.GOOGLE_CLIENT_ID;
      const client = new OAuth2Client(CLIENT_ID_GOOGLE)
      const ticket = await client.verifyIdToken({
        idToken: req.body.access_token,
        audience: CLIENT_ID_GOOGLE,
      });
  
      if (ticket) {
        const foundUser = await this.prismaService.user.upsert({
          where: {
            email: ticket.getPayload().email,
          },
          create: {
            email: ticket.getPayload().email,
            name: ticket.getPayload().given_name,
            password: Math.random().toString(36).substr(2),
            entrepreneurialExperience: EntrepreneurialExperience.neverFounder,
            isPaying: false
          },
          update: {}
        });
        if (foundUser) {
           const token = await this.authService.login(foundUser);
          if (token) {
            res.cookie('tai_user_token',token.access_token, { maxAge: 3600000, httpOnly: true });
            res.send(foundUser);
          }  
        }
      }
      return ticket
    }

    @UseGuards(JwtAuthGuard)
    @Get('check-auth')
    async checkUserIsLoggedIn(@Request() req, @Response() res) {
      try {
        res.send(req.user);
      } catch(e) {
        console.log(e, ' is the error !!')
      }
    }
}
