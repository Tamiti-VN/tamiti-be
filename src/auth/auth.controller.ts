import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard, SessionAuthGuard } from './guard/auth.guard';
import { SessionService } from './session.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }

  @Post('logout')
  @UseGuards(SessionAuthGuard)
  async logout(@Request() req, @Response() res) {
    const sessionId = req.sessionID;
    req.logout((err) => {
      if (err) {
        return res.sendStatus(400);
      }
      req.session.destroy(async (err) => {
        if (err) {
          return res.sendStatus(500);
        }
        await this.sessionService.delete(sessionId);
        res.clearCookie('connect.sid');
        return res.sendStatus(200);
      });
    });
  }
}
