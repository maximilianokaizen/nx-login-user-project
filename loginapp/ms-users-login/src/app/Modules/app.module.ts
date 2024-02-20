import { Module } from '@nestjs/common';

import { AppController } from './Users/insfrastructure/controllers/app.controller';
import { AppService } from './Users/application/services/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
