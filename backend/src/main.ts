import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Enable CORS
   app.enableCors({
    origin: 'http://localhost:4200', // Replace with your Angular app's URL
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // If you need to send cookies
  });
  await app.listen(3000);
}
bootstrap();
