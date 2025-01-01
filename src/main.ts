import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3333;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log('Server is running at PORT: ', PORT);
}
bootstrap();