import { Injectable } from '@nestjs/common';
import { User } from '../../Users/domain/dto/user.dto';
import { Email } from '../../Users/domain/values-objects/Email';
import { Password } from '../../Users/domain/values-objects/Password';
import { PrismaService } from '../application/services/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async auth(email: Email, password: Password): Promise<User | null> {
    const userEmail = email.getValue();
    const userRecord = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!userRecord) {
      return null;
    }

    const userPassword = new Password(userRecord.password); 
    if (userPassword.getValue() !== userRecord.password) {
      return null;
    }

    return this.mapToUserDto(userRecord);
  }

  async create(email: Email, password: Password): Promise<User> {
    const userEmail = email.getValue();
    const userPassword = password.getValue(); 

    const newUser = await this.prisma.user.create({
      data: {
        email: userEmail,
        password: userPassword,
        createdAt : new Date(),
      },
    });

    return this.mapToUserDto(newUser);
  }

  private mapToUserDto(userRecord: any): User {
    return new User(
      userRecord.id,
      userRecord.uuid, 
      userRecord.email,
      null, 
      userRecord.createdAt,
      userRecord.deletedAt,
      userRecord.modifiedAt
    );
  }
}

