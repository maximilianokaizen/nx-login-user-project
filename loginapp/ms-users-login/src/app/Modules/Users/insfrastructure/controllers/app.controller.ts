import {
  Body,
  Controller,
  Post,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Email } from '../../domain/values-objects/Email';
import { Password } from '../../domain/values-objects/Password';
import { UsersService } from '../../application/services/app.service';
import { IoException } from '../../../Shared/infrastructure/exceptions/io.exception';
import { CreateUserDto } from '../../domain/dto/create.user.dto';
import { Logger } from '../../../Shared/infrastructure/logger';
import { last } from 'rxjs';
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger
  ) {}
  @Post('/')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({
    description: 'Add User',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: 'User email' },
        password: { type: 'string', description: 'User password' },
        name: { type: 'string', description: 'Name' },
        lastName: { type: 'string', description: 'LastName' },
      },
      required: ['email', 'password','name','lastname'],
    },
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const { email, password, name, lastName } = createUserDto;
      return this.usersService.createUser(email, password, name, lastName);
    } catch (error) {
      this.logger.error('Error creating user', error.stack);
      throw new IoException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/auth')
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiResponse({ status: 200, description: 'User authenticated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({
    description: 'User credentials',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: 'User email' },
        password: { type: 'string', description: 'User password' },
      },
      required: ['email', 'password'],
    },
  })
  async authenticateUser(@Body() body: any) {
    try {
      const email = new Email(body.email);
      const password = new Password(body.password);
      return await this.usersService.authenticateUser(
        email.getValue(),
        password.getValue()
      );
    } catch (error) {
      throw new IoException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
