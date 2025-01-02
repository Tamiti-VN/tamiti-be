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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  logout(@Request() req, @Response() res) {
    req.logout((err) => {
      if (err) {
        return res.sendStatus(400);
      }
      req.session.destroy((err) => {
        if (err) {
          return res.sendStatus(500);
        }
        res.clearCookie('connect.sid');
        return res.sendStatus(200);
      });
    });
  }
}
