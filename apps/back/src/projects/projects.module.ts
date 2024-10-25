import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [ProjectsService, PrismaService]
})
export class ProjectsModule {}
