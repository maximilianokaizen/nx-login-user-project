import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './app/Modules/Users/domain/entities/user.entity';
import { AppController } from './app/Modules/Users/insfrastructure/controllers/app.controller';
import { AppService } from './app/Modules/Users/application/services/app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User]), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}