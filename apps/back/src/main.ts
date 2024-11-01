import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

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
