import { Controller, Get, Param, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalAuthGuard } from './local-auth.guard';
import { OAuth2Client } from 'google-auth-library';
import { JwtAuthGuard } from './jwt-auth.guard';
import { EntrepreneurialExperience } from 'src/types/enums';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private prismaService: PrismaService, private usersService: UsersService) {}

    @Post('verify-email')
    async verifyEmail(@Request() req, @Response() res) {
      try {
          const { token } = req.body;
          const response = await this.authService.verifyEmail(token);
          if (response.token) {
            res.cookie('tai_user_token',response.token.access_token, { maxAge: 3600000, httpOnly: true, secure: true, sameSite: 'none' });
            res.send(response.user);
          }
       } catch(e) {
         console.log(e)
       }
    }

    @Post('sign-up')
    async signUp(@Request() req, @Response() res) {
      try {
        const { email, password, name, entrepreneurialExperience } = req.body;
          const foundUser = await this.usersService.findOneByEmail(email);
          if (foundUser) {
            res.send({
              error: 'USER_ALREADY_EXISTS'
            })
          } else {
            const sent = await this.authService.sendVerificationEmail({ email, password, name, entrepreneurialExperience });
            res.send(sent);
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
          res.cookie('tai_user_token', token.access_token, { maxAge: 3600000, httpOnly: true, secure: true, sameSite: 'none',  });
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
            isPaying: false,
          },
          update: {}
        });
        if (foundUser) {
           const token = await this.authService.login(foundUser);
          if (token) {
            res.cookie('tai_user_token',token.access_token, { maxAge: 3600000, httpOnly: true, secure: true, sameSite: 'none',  });;
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
