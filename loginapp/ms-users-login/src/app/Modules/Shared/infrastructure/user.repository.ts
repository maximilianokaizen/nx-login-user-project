import { Injectable } from '@nestjs/common';
import { User } from '../../Users/domain/dto/user.dto';
import { PrismaService } from '../application/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { Logger } from '../../Shared/infrastructure/logger';
import { AuthUserDto } from '../../Users/domain/dto/auth.users.dto';
import { HttpResponseDto } from '../../Users/domain/dto/http.response.dto';
import { UserRepositoryInterface } from '../../Users/domain/repository/user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface{
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger
  ) {}
  async auth(email: string, password: string): Promise<AuthUserDto | null> {
    try {

      const errUser : AuthUserDto = {
        success : false
      }

      const userRecord = await this.prisma.user.findUnique({
        where: {
          email,
          deleted : false,
        },
      });

      if (!userRecord) {
        return errUser;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        userRecord.password
      );
      if (!isPasswordValid) {
        return errUser;
      }

      const authUser : AuthUserDto = {
        success : true,
        uuid : userRecord.uuid,
        email : userRecord.email,
        name : userRecord.name,
        lastName : userRecord.lastName,
        token : '',
        createdAt : userRecord.createdAt,
      }
      return authUser;
    } catch (error) {
      this.logger.error('Error in auth in user', error.stack);
    }
  }

  async create(email: string, password: string, name : string, lastName: string): Promise<User | HttpResponseDto> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          email,
          name,
          lastName,
          deleted : false,
          password : hashedPassword,
          createdAt: new Date(),
        },
      });
      return this.mapToUserDto(newUser);
    } catch (error) {
      const newResponse = new HttpResponseDto(
        400,
        'Error creating the user',
        false
      );
      this.logger.error('Error creating user in repo', '');
      return newResponse;
  }
  }
  private mapToUserDto(userRecord: any): User {
    return new User(
      userRecord.email,
      userRecord.name,
      userRecord.lastName,
      null,
      userRecord.id,
      userRecord.uuid,
      userRecord.createdAt,
      userRecord.deletedAt,
      userRecord.modifiedAt
    );
  }
}
