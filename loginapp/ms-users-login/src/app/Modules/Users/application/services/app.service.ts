import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../Shared/infrastructure/user.repository';
import { AuthUserDto } from '../../domain/dto/auth.users.dto';
import { User } from '../../domain/dto/user.dto';
import { HttpResponseDto } from '../../domain/dto/http.response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(
    email: string,
    password: string,
    name : string,
    lastName : string,
    ): Promise<User | HttpResponseDto> {
    const user = await this.userRepository.create(email, password, name, lastName);
    return user;
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<AuthUserDto> {
    const user = await this.userRepository.auth(email, password);
    return user;
  }
}
