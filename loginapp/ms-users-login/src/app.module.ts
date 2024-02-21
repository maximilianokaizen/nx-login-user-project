import { Module } from '@nestjs/common';
import { UserController } from './app/Modules/Users/insfrastructure/controllers/app.controller';
import { UsersService } from './app/Modules/Users/application/services/app.service';
import { PrismaService } from './app/Modules/Shared/application/services/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UsersService, PrismaService],
  exports : [PrismaService]
})
export class AppModule {}