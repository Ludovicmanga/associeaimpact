import { Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
    constructor(private conversationService: ConversationsService) {}

    @UseGuards(JwtAuthGuard)
    @Get('get-conversation-between-interlocutors/:id')
    async getMessagesBetweenTwoInterlocutors(@Req() req, @Res() res, @Param('id') param) {
        try {
            const loggedUserId = req.user.id;
            const interlocutorId = parseInt(param);
            const conversation = await this.conversationService.getConversationBetweenTwoInterlocutors(loggedUserId, interlocutorId);
            if (conversation) {
                const formattedConv = {
                    id: conversation.id,
                    interlocutorName: conversation.firstSender.id === req.user.id ? conversation.firstReceiver.name : conversation.firstSender.name,
                    unreadCount: conversation.firstSender.id === req.user.id ? conversation.unreadByFirstSender : conversation.unreadByFirstReceiver,
                    preview: conversation.preview
                }
                res.send(formattedConv);
            } else {
                res.send(conversation)
            }
        } catch(e) {
            console.log(e, ' are the errors');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createConversation(@Req() req, @Res() res) {
        try {
            const interlocutorId = req.body.interlocutorId;
            const createdConv = await this.conversationService.createConversation(req.user.id, interlocutorId);
            res.send(createdConv);
        } catch(e) {
            console.log(e, ' are the errors');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-user-conversations')
    async getUserConversations(@Req() req, @Res() res) {
        try {
            const conversations = await this.conversationService.getUserConversations(req.user.id);
            const formattedConversation = conversations.map(conv => {
                return {
                    id: conv.id,
                    interlocutorName: conv.firstSender.id === req.user.id ? conv.firstReceiver.name : conv.firstSender.name,
                    unreadCount: conv.firstSender.id === req.user.id ? conv.unreadByFirstSender : conv.unreadByFirstReceiver,
                    preview: conv.preview
                }
            })
            res.send(formattedConversation);
        } catch(e) {
            console.log(e, ' are the errors');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('check-user-has-access/:id')
    async checkUserHasAccessToConversation(@Req() req, @Res() res, @Param('id') param) {
        try {
            const conversationId = parseInt(param);
            const userHasAccessToConv = await this.conversationService.checkUserHasAccessToConversation(req.user.id, conversationId);
            res.send(userHasAccessToConv);
        } catch(e) {
            console.log(e)
        }
    }

}
