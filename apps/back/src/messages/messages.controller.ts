import { Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
    constructor(private messageService: MessagesService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get('get-all-user-messages')
    async getAllUserMessages(@Req() req, @Res() res) {
        try {
            const messages = await this.messageService.getAllUserMessages(req.user.id);
            res.send(messages);
        } catch(e) {
            console.log(e, ' are the errors');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Req() req, @Res() res) {
        try {
            const { content, conversationId } = req.body;
            const senderId = req.user.id;
            const message = await this.messageService.createMessage(senderId, content, conversationId);
            const formattedMessage = { ...message, type: 'sent' }
            res.send(formattedMessage);
        } catch(e) {
            console.log(e, ' are the errors');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-conversation-messages/:id')
    async getConversationMessages(@Req() req, @Res() res, @Param('id') param) {
        try {
            const conversationId = parseInt(param)
            const conversationMessages = await this.messageService.getConversationMessages(conversationId, req.user.id);
            const formattedMessages = conversationMessages.map(mess => {
                return { ...mess, type: mess.senderId === req.user.id ? 'sent' : 'received',
                }
            })
            res.send(formattedMessages);
        } catch(e) {
            console.log(e, ' are the errors');
        }
    }
}
