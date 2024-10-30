import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
class RedirectMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Check if the request is for the root domain (without www)
    if (req.hostname === 'associeimpact.fr') {
      // Redirect to the www domain, preserving the path and query parameters
      return res.redirect(301, `https://www.associeimpact.fr${req.url}`);
    }
    next();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 8080;

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000', 'https://associeimpact.fr', 'https://www.associeimpact.fr', 'associeimpact.fr'],
    credentials: true
  });
  app.use(cookieParser());

  await app.listen(PORT);
}
bootstrap();
