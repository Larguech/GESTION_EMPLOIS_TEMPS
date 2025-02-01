import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Activer CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Autoriser uniquement Angular
    credentials: true, // Permettre les cookies et headers d'auth
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Méthodes autorisées
    allowedHeaders: 'Content-Type, Authorization', // Headers autorisés
  });

  await app.listen(3000);
}
bootstrap();
