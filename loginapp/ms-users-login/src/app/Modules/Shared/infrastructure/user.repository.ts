import { Injectable } from '@nestjs/common';
import { User } from '../../Users/domain/dto/user.dto';
import { PrismaService } from '../application/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { Logger } from '../../Shared/infrastructure/logger';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger
  ) {}
  async auth(email: string, password: string): Promise<User | null> {
    try {
      const userRecord = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!userRecord) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        userRecord.password
      );
      if (!isPasswordValid) {
        return null;
      }

      return this.mapToUserDto(userRecord);
    } catch (error) {
      this.logger.error('Error in auth in user', error.stack);
    }
  }

  async create(email: string, password: string): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          createdAt: new Date(),
        },
      });
      return this.mapToUserDto(newUser);
    } catch (error) {
      this.logger.error('Error creating user in repo', error.stack);
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
