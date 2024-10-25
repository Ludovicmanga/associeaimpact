import { Controller, Get, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

   @UseGuards(JwtAuthGuard)
   @Patch()
   async editUser(  @Req() req, @Res() res) {
    try {
        const { name, entrepreneurialExperience } = req.body;
        const editedUser = await this.usersService.editUser({ id: req.user.id, name, entrepreneurialExperience });
        res.send(editedUser);
    } catch(e) {
        console.log(e)
    }
   }
}
