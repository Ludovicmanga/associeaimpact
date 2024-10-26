import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET);

@Injectable()
export class StripeService {
    constructor(private prismaService: PrismaService){}
    
    async createCheckoutSession() {
       return  await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
              {
                price: 'price_1Q9TooGNxxoYuOrQVdblxDMu',
                quantity: 1,
              },
            ],
            mode: 'payment',
            return_url: `${process.env.FRONTEND_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
          });
    }

    async getSessionStatus(sessionId: string) {
        return await stripe.checkout.sessions.retrieve(sessionId);
    }

    async makeUserAsPaying(userId: number) {
        return await this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                isPaying: true
            }
        })
    }
}
