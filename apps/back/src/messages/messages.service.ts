import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from "@sendgrid/mail";
const sgMail = new MailService();
import { messageReceivedTemplateId } from 'src/constants/constants';
import { User } from '@prisma/client';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

@Injectable()
export class MessagesService {
    constructor(private prismaService: PrismaService) {}

    async createMessage(senderId: number, content: string, conversationId: number) {
        const conversationFound = await this.prismaService.conversation.findUnique({
            where: {
                id: conversationId
            },
        });

        const createdMessage = await this.prismaService.message.create({
            data: {
                senderId,
                receiverId: senderId === conversationFound.firstSenderId ? conversationFound.firstReceiverId : conversationFound.firstSenderId,
                content,
                conversationId,
            },
            include: {
                receiver: true,
                sender: true
            }
        });
        if (createdMessage) {
            const updateQuery = () => {
                const updatePreviewQuery = {
                    preview: createdMessage.content.substring(0,50) + "..."
                };

                if (conversationFound.firstSenderId === senderId) {
                    return {
                        ...updatePreviewQuery,
                        unreadByFirstReceiver: conversationFound.unreadByFirstReceiver + 1
                    }
                } else {
                    return {
                        ...updatePreviewQuery,
                        unreadByFirstSender: conversationFound.unreadByFirstSender + 1
                    }
                }
            };

            const updatedConv = await this.prismaService.conversation.update({
                where: {
                    id: conversationId
                },
                data: updateQuery(),
            })
            if (updatedConv) {
                await this.sendMessageReceivedEmail(createdMessage.receiver.email, createdMessage.sender, createdMessage.content)
                return createdMessage;
            }
        }
    }

    async getAllUserMessages(userId: number) {
        const messages = await this.prismaService.message.findMany({
            where: {
                OR: [{
                    senderId: userId,
                },
                {
                    receiverId: userId,
                }]
            }
        });
        return messages;
    }

    async getConversationMessages(conversationId: number, readerId: number) {
        const conversationFound = await this.prismaService.conversation.findUnique({
            where: {
                id: conversationId
            },
        });

        const updateUnreadCountQuery = () => {
            if (conversationFound.firstSenderId === readerId) {
                return {
                    unreadByFirstSender: 0
                }
            } else {
                return {
                    unreadByFirstReceiver: 0
                }
            }
        };

        await this.prismaService.conversation.update({
            where: {
                id: conversationId
            },
            data: updateUnreadCountQuery()
        });

        const messagesFromConv = await this.prismaService.message.findMany({
            where: {
                conversationId
            }
        });
        return messagesFromConv;
    }

    sendMessageReceivedEmail = async (email: string, interlocutor: User, message: string) => {
        const msg = {
            to: email,
            from: 'ludovic.mangaj@gmail.com',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            template_id: messageReceivedTemplateId,
            dynamic_template_data: {
                interlocutor_name: interlocutor.name,
                message_preview: message.substring(0, 10) + '...',
                conversation_link: `http://localhost:3000/messages/${interlocutor.id}`
            }
          }
          
         const sentMessage = await sgMail.send(msg);
    }
}
