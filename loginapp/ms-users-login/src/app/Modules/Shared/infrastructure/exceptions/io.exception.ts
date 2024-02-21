import { HttpException, HttpStatus } from '@nestjs/common';

export class IoException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }
}
