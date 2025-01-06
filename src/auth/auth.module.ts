import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './guard/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './guard/session.serializer';
import { SessionService } from './session.service';
import { Session } from './entities/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Session]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, SessionService],
  exports: [SessionService],
})
export class AuthModule {}
