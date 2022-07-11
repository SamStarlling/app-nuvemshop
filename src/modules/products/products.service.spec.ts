import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CredentialsEntity } from '../entities/credentials.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('Products Service', () => {
  let productsService: ProductsService;
  let credentialsEntity: Repository<CredentialsEntity>;
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

    productsService = moduleRef.get<ProductsService>(ProductsService);
    credentialsEntity = moduleRef.get<Repository<CredentialsEntity>>(
      getRepositoryToken(CredentialsEntity),
    );
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });
});
