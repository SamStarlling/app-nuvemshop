import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CredentialsEntity } from '../entities/credentials.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('Products Controller', () => {
  let productsController: ProductsController;
  // const result = responseOfFindAllProductsId;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CredentialsEntity, HttpModule],
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(CredentialsEntity),
          useValue: { connection: jest.fn() },
        },
        {
          provide: HttpService,
          useValue: { connection: jest.fn() },
        },
      ],
    }).compile();
    productsController = moduleRef.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });
});
