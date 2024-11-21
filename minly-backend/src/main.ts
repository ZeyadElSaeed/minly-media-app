import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins or specify specific origins
  app.enableCors({
    origin: '*', // Allow requests only from localhost:3000
    methods: 'GET,POST,PUT,DELETE,PATCH', // Allowed HTTP methods
    allowedHeaders: '*', // Allowed headers
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
