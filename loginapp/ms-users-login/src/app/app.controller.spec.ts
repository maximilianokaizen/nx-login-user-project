import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './Modules/Users/insfrastructure/controllers/app.controller';
import { AppService } from './Modules/Users/application/services/app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
