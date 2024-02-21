import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../Shared/infrastructure/user.repository';
import { Email } from '../../domain/values-objects/Email';
import { Password } from '../../domain/values-objects/Password';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository : UserRepository){
  }
  async createUser(email : Email, password : Password): Promise<{ message: string }> {
    const user = await this.userRepository.auth(email, password);
    if (user) {
      return { message: 'User Created' };
    } else {
      return { message: 'User Creation failed' };
    }
  }

  async authenticateUser(email: Email, password: Password): Promise<{ message: string }> {
    const user = await this.userRepository.auth(email, password);
    if (user) {
      return { message: 'User authenticated successfully' };
    } else {
      return { message: 'Authentication failed' };
    }
  }
  
}
