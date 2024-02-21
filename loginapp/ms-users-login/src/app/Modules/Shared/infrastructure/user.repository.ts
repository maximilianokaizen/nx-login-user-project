import { Injectable } from '@nestjs/common';
import { User } from '../../Users/domain/dto/user.dto';
import { Password } from '../../Users/domain/values-objects/Password';
import { PrismaService } from '../application/services/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async auth(email: string, password: string): Promise<User | null> {
    const userRecord = await this.prisma.user.findUnique({
      where: {
        email
      },
    });

    if (!userRecord) {
      return null;
    }

    const userPassword = new Password(userRecord.password); 
    if (userPassword.getValue() != userRecord.password) {
      return null;
    }

    return this.mapToUserDto(userRecord);
  }

  async create(email: string, password: string): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password,
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

