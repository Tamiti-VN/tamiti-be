import { BadRequestException, Injectable } from '@nestjs/common';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async delete(sessionID: string) {
    return await this.sessionRepository.delete({ id: sessionID });
  }
}
