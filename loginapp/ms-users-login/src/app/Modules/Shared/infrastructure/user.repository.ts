import { Injectable } from '@nestjs/common';
import { User } from '../../Users/domain/dto/user.dto';
import { Password } from '../../Users/domain/values-objects/Password';
import { PrismaService } from '../application/services/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async auth(email: string, password: string): Promise<User | null> {
    try {
      const userRecord = await this.prisma.user.findUnique({
        where: {
          email
        },
      });
  
      if (!userRecord) {
        return null;
      }
  
      const isPasswordValid = await bcrypt.compare(password, userRecord.password);
      if (!isPasswordValid) {
        return null;
      }
  
      return this.mapToUserDto(userRecord);
    } catch (error) {
      // TODO logger
    }
  }

  async create(email: string, password: string): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword, 
          createdAt : new Date(),
        },
      });
      return this.mapToUserDto(newUser);
    } catch (error) {
       // TODO logger
    }
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

