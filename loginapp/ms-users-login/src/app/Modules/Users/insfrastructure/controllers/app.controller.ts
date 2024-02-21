import { Body, Controller, Post, HttpException, HttpStatus  } from '@nestjs/common';
import { Email } from '../../domain/values-objects/Email';
import { Password } from '../../domain/values-objects/Password';
import { UsersService } from '../../application/services/app.service';
import { IoException } from '../../../Shared/infrastructure/exceptions/io.exception';
@Controller()
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/user')
  createUser(@Body() body: any) {
    try {
      const email = new Email(body.email);
      const password = new Password(body.password);
      return this.usersService.createUser(email, password);
    } catch (error) {
      throw new IoException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/auth')
  async authenticateUser(@Body() body: any) {
    try {
      const email = new Email(body.email);
      const password = new Password(body.password);
      return await this.usersService.authenticateUser(email, password);
    } catch (error) {
      throw new IoException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}