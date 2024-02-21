import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../Shared/infrastructure/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(
    email: string,
    password: string
  ): Promise<{ message: string }> {
    const user = await this.userRepository.create(email, password);
    if (user) {
      return { message: 'User Created' };
    } else {
      return { message: 'User Creation failed' };
    }
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<{ message: string }> {
    const user = await this.userRepository.auth(email, password);
    if (user) {
      return { message: 'User authenticated successfully' };
    } else {
      return { message: 'Authentication failed' };
    }
  }
}
