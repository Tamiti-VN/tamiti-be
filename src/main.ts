import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';

import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { Session } from './auth/entities/session.entity';

async function bootstrap() {
  const PORT = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource);
  const sessionRepository = dataSource.getRepository(Session);
  const configService = app.get(ConfigService);
  const NODE_ENV = configService.get<string>('NODE_ENV');
  const COOKIE_SECRET = configService.get<string>('COOKIE_SECRET');
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // cookie expires 1 day later
        secure: NODE_ENV === 'production',
        httpOnly: true,
        sameSite: NODE_ENV === 'production' ? 'strict' : 'lax',
      },
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false,
        ttl: 24 * 60 * 60,
      }).connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT);
  console.log('Server is running at PORT: ', PORT);
}
bootstrap();
