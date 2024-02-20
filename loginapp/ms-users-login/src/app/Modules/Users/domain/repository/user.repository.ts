import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from "typeorm";
import { User } from '../dto/user.dto';
import { Email } from '../values-objects/Email';
import { Password } from '../values-objects/Password';

@Injectable()
export class UserRepository {
  async auth(email: Email, password: Password): Promise<User | null> {
    const user = null; // TODO 
    if (!user) {
      return null;
    }
    if (user.password.matches(password)) {
      return user;
    }
    return null;
  }
}
