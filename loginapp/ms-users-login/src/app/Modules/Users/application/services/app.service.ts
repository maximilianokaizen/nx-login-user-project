import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../Shared/infrastructure/user.repository';
import { AuthUserDto } from '../../domain/dto/auth.users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(
    email: string,
    password: string,
    name : string,
    lastName : string,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.create(email, password, name, lastName);
    if (user) {
      return { message: 'User Created' };
    } else {
      return { message: 'User Creation failed' };
    }
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<AuthUserDto> {
    const user = await this.userRepository.auth(email, password);
    return user;
  }
}
