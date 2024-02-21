import { Module } from '@nestjs/common';
import { UserController } from './app/Modules/Users/insfrastructure/controllers/app.controller';
import { UsersService } from './app/Modules/Users/application/services/app.service';
import { UserRepository } from './app/Modules/Shared/infrastructure/user.repository';
import { PrismaService } from './app/Modules/Shared/application/services/prisma.service';
import { Logger } from './app/Modules/Shared/infrastructure/logger';
@Module({
  controllers: [UserController],
  providers: [UsersService, UserRepository, PrismaService, Logger],
  exports : [Logger]
})
export class AppModule {}