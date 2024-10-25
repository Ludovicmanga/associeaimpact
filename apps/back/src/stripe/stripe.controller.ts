import { Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StripeService } from './stripe.service';
import { UsersService } from 'src/users/users.service';

@Controller('stripe')
export class StripeController {

    constructor(private stripeService: StripeService, private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create-checkout-session')
    async createCheckoutSession(@Req() req, @Res() res) {
        try {
            const session = await this.stripeService.createCheckoutSession();
            res.send({clientSecret: session.client_secret});
        } catch(e) {
            console.log(e, ' is the stripe error')
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('session-status')
    async getSessionStatus(@Req() req, @Res() res, @Query() query) {
        try {
            const session = await this.stripeService.getSessionStatus(query.session_id);
            if (session.status === "complete") {
                const foundUser = await this.usersService.findOneByEmail(session.customer_details.email);
                if (foundUser) {
                    await this.stripeService.makeUserAsPaying(foundUser.id);
                }
            }
            res.send({
                status: session.status,
                customer_email: session.customer_details.email
            });
        } catch(e) {
            console.log(e)
        }
    }
}

