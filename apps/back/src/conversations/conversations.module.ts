import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [ConversationsController],
    providers: [ConversationsService, PrismaService],
    imports: [PrismaModule]
  })
export class ConversationsModule {
    
}
