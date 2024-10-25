import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConversationsService {
    constructor(private prismaService: PrismaService) {}

    async createConversation(firstSenderId: number, firstReceiverId: number) {
        const createdConv = await this.prismaService.conversation.create({
            data: {
                firstSenderId,
                firstReceiverId,
                unreadByFirstSender: 0,
                unreadByFirstReceiver: 0,
                preview: ''
            }
        })
        return createdConv;
    }

    async getConversationBetweenTwoInterlocutors(loggedUserId: number, interlocutorId: number) {
        const conversation = await this.prismaService.conversation.findFirst({
            where: {
                OR: [{
                    firstSenderId: loggedUserId,
                    firstReceiverId: interlocutorId
                },
                {
                    firstSenderId: interlocutorId,
                    firstReceiverId: loggedUserId
                }]
            },
            include: {
                firstSender: true,
                firstReceiver: true
            }
        });
        return conversation;
    }

    async getUserConversations(loggedUserId: number) {
        const conversations = await this.prismaService.conversation.findMany({
            where: {
                OR: [{
                    firstSenderId: loggedUserId,
                },
                {
                    firstReceiverId: loggedUserId
                }]
            },
            include: {
                firstSender: true,
                firstReceiver: true
            },
        });
        return conversations;
    }

    async checkUserHasAccessToConversation(userId: number, conversationId: number) {
        const conversationFound = await this.prismaService.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                firstReceiver: true
            }
        });
        if (conversationFound) {
            const userIsFirstSender = conversationFound.firstSenderId === userId;
            if (userIsFirstSender) {
                return true;
            }
            if (conversationFound.firstReceiverId === userId && conversationFound.firstReceiver.isPaying) {
                return true
            }
            return false;
        }
        return false;
    }

}
