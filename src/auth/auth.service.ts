import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

import { UsersService } from 'src/users/users.service';
import { hashPassword } from 'src/utils/helper';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async register(createAuthDto: CreateAuthDto) {
    const isEmailExist = await this.usersService.findByEmail(
      createAuthDto.email,
    );

    if (isEmailExist)
      throw new BadRequestException(
        `Email is registered. Please login instead!`,
      );
    const hashedPassword = await hashPassword(createAuthDto.password);

    return await this.usersService.create({
      email: createAuthDto.email,
      password: hashedPassword,
    });
  }
}
