import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntrepreneurialExperience } from 'src/types/enums';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}
    async findOneByEmail(email: string) {
        return this.prismaService.user.findFirst({
            where: {
                email
            }
        })
    }

    async editUser(args: { id: number; name: string, entrepreneurialExperience: EntrepreneurialExperience }) {
        return await this.prismaService.user.update({
            where: {
                id: args.id,
            },
            data: {
                entrepreneurialExperience: args.entrepreneurialExperience,
                name: args.name
            }
        })
    }
}
