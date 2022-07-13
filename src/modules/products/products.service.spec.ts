import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CredentialsEntity } from '../entities/credentials.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('Products Service route Products', () => {
  let productsService: ProductsService;
  let credentialsRepository: Repository<CredentialsEntity>;
  const mockProduct = {
    id: 124406536,
    name: {
      pt: 'Jaqueta de couro',
    },
    description: {
      pt: '<p>Voltado para amantes de moto e estilo.</p>\r\n\r\n<p>100% couro</p>\r\n',
    },
    handle: {
      pt: 'jaqueta-de-couro',
    },
    attributes: [
      {
        pt: 'Tamanho',
      },
    ],
    published: false,
    free_shipping: false,
    requires_shipping: true,
    canonical_url:
      'https://elitewaystyle.lojavirtualnuvem.com.br/produtos/jaqueta-de-couro/',
    video_url: null,
    seo_title: {
      pt: '',
    },
    seo_description: {
      pt: '',
    },
    brand: '',
    created_at: '2022-06-23T13:24:06+0000',
    updated_at: '2022-06-23T13:48:27+0000',
    variants: [
      {
        id: 484870356,
        image_id: 332993528,
        product_id: 124406536,
        position: 1,
        price: '500.00',
        compare_at_price: '500.00',
        promotional_price: '250.00',
        stock_management: true,
        stock: 11,
        weight: '0.200',
        width: '40.00',
        height: '45.00',
        depth: '30.00',
        sku: null,
        values: [
          {
            pt: 'P',
          },
        ],
        barcode: null,
        mpn: null,
        age_group: 'adult',
        gender: 'male',
        created_at: '2022-06-23T13:24:06+0000',
        updated_at: '2022-06-23T13:48:26+0000',
      },
      {
        id: 484870357,
        image_id: 332993528,
        product_id: 124406536,
        position: 2,
        price: '500.00',
        compare_at_price: '500.00',
        promotional_price: '390.00',
        stock_management: true,
        stock: 1,
        weight: '0.200',
        width: '40.00',
        height: '45.00',
        depth: '30.00',
        sku: null,
        values: [
          {
            pt: 'M',
          },
        ],
        barcode: null,
        mpn: null,
        age_group: null,
        gender: 'unisex',
        created_at: '2022-06-23T13:24:06+0000',
        updated_at: '2022-06-23T13:48:26+0000',
      },
      {
        id: 484870359,
        image_id: 332993528,
        product_id: 124406536,
        position: 3,
        price: '500.00',
        compare_at_price: '500.00',
        promotional_price: '390.00',
        stock_management: true,
        stock: 1,
        weight: '0.200',
        width: '40.00',
        height: '45.00',
        depth: '30.00',
        sku: null,
        values: [
          {
            pt: 'G',
          },
        ],
        barcode: null,
        mpn: null,
        age_group: null,
        gender: 'unisex',
        created_at: '2022-06-23T13:24:06+0000',
        updated_at: '2022-06-23T13:48:26+0000',
      },
      {
        id: 484870360,
        image_id: 332993528,
        product_id: 124406536,
        position: 4,
        price: '500.00',
        compare_at_price: '500.00',
        promotional_price: '390.00',
        stock_management: true,
        stock: 1,
        weight: '0.200',
        width: '40.00',
        height: '45.00',
        depth: '30.00',
        sku: null,
        values: [
          {
            pt: 'GG',
          },
        ],
        barcode: null,
        mpn: null,
        age_group: null,
        gender: 'unisex',
        created_at: '2022-06-23T13:24:06+0000',
        updated_at: '2022-06-23T13:48:26+0000',
      },
      {
        id: 484870361,
        image_id: 332993528,
        product_id: 124406536,
        position: 5,
        price: '500.00',
        compare_at_price: '500.00',
        promotional_price: '390.00',
        stock_management: true,
        stock: 1,
        weight: '0.200',
        width: '40.00',
        height: '45.00',
        depth: '30.00',
        sku: null,
        values: [
          {
            pt: 'XG',
          },
        ],
        barcode: null,
        mpn: null,
        age_group: null,
        gender: 'unisex',
        created_at: '2022-06-23T13:24:06+0000',
        updated_at: '2022-06-23T13:48:26+0000',
      },
    ],
    tags: '',
    images: [
      {
        id: 332993528,
        product_id: 124406536,
        src: 'https://d2r9epyceweg5n.cloudfront.net/stores/002/235/163/products/jaqueta-de-courp1-0ec3ef7f704d93f95816560052068812-1024-1024.jpeg',
        position: 1,
        alt: [],
        created_at: '2022-06-23T13:19:55+0000',
        updated_at: '2022-06-23T17:26:50+0000',
      },
    ],
    categories: [
      {
        id: 13835822,
        name: {
          pt: 'Jaquetas / Casacos',
        },
        description: {
          pt: '',
        },
        handle: {
          pt: 'jaquetas-casacos',
        },
        parent: null,
        subcategories: [],
        seo_title: {
          pt: '',
        },
        seo_description: {
          pt: '',
        },
        google_shopping_category: null,
        created_at: '2022-06-23T13:23:06+0000',
        updated_at: '2022-06-23T13:23:06+0000',
      },
      {
        id: 13836083,
        name: {
          pt: 'Homem',
        },
        description: {
          pt: '',
        },
        handle: {
          pt: 'homem',
        },
        parent: null,
        subcategories: [],
        seo_title: {
          pt: '',
        },
        seo_description: {
          pt: '',
        },
        google_shopping_category: null,
        created_at: '2022-06-23T13:24:05+0000',
        updated_at: '2022-06-23T13:24:05+0000',
      },
    ],
  };

  const mockCredentials = {
    user_id: 1,
    token: 'mockToken',
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CredentialsEntity, HttpModule],
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(CredentialsEntity),
          useValue: {
            findOneById: jest.fn(() => {
              return Promise.resolve(mockCredentials);
            }),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => {
              return {
                toPromise: () => {
                  return Promise.resolve({
                    data: mockProduct,
                  });
                },
              };
            }),
          },
        },
      ],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    credentialsRepository = moduleRef.get<Repository<CredentialsEntity>>(
      getRepositoryToken(CredentialsEntity),
    );
  });

  it('Should be defined Products Service', () => {
    expect(productsService).toBeDefined();
  });

  it('Should be defined Credentials Entity', () => {
    expect(credentialsRepository).toBeDefined();
  });

  it('Should be return user', async () => {
    const user = await productsService.isUserValid(mockCredentials.user_id);
    expect(user).toEqual(mockCredentials);
  });

  it('Get product by product_id', async () => {
    const product = await productsService.getProductById(
      mockCredentials.user_id,
      124406536,
    );
    expect(product).toEqual(mockProduct);
  });

  // it('Get Products Variants ordered by minor', async () => {
  //   const productsVariants = await productsService.getOrderProductByDiscount(
  //     2235163,
  //     124406536,
  //     'minor',
  //   );
  //   expect(productsVariants).toEqual(mockResultMinor);
  // });

  // it('Get Products Variants ordered by major', async () => {
  //   const productsVariants = await productsService.getOrderProductByDiscount(
  //     2235163,
  //     124406536,
  //     'major',
  //   );
  //   expect(productsVariants).toEqual(mockResultMajor);
  // });
});

describe('Products Service route Products/Variants', () => {
  let productsService: ProductsService;
  let credentialsRepository: Repository<CredentialsEntity>;
  const mockProduct = [
    {
      product_id: 124406536,
      id: 484870357,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
    {
      product_id: 124406536,
      id: 484870359,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
    {
      product_id: 124406536,
      id: 484870360,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
    {
      product_id: 124406536,
      id: 484870361,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
    {
      product_id: 124406536,
      id: 484870356,
      price: '500.00',
      promotional_price: '250.00',
      stock: 11,
    },
  ];

  const mockResultMinor = [
    {
      product_id: 124406536,
      valueOfDiscount: '110.00',
      id: 484870357,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
    {
      product_id: 124406536,
      valueOfDiscount: '110.00',
      id: 484870359,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
    {
      product_id: 124406536,
      valueOfDiscount: '110.00',
      id: 484870360,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
    {
      product_id: 124406536,
      valueOfDiscount: '110.00',
      id: 484870361,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
    {
      product_id: 124406536,
      valueOfDiscount: '250.00',
      id: 484870356,
      price: '500.00',
      promotional_price: '250.00',
      stock: 11,
    },
  ];

  const mockResultMajor = [
    {
      product_id: 124406536,
      valueOfDiscount: '250.00',
      id: 484870356,
      price: '500.00',
      promotional_price: '250.00',
      stock: 11,
    },
    {
      product_id: 124406536,
      valueOfDiscount: '110.00',
      id: 484870357,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
    {
      product_id: 124406536,
      valueOfDiscount: '110.00',
      id: 484870359,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
    {
      product_id: 124406536,
      valueOfDiscount: '110.00',
      id: 484870360,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
    {
      product_id: 124406536,
      valueOfDiscount: '110.00',
      id: 484870361,
      price: '500.00',
      promotional_price: '390.00',
      stock: 1,
    },
  ];

  const mockCredentials = {
    user_id: 1,
    token: 'mockToken',
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CredentialsEntity, HttpModule],
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(CredentialsEntity),
          useValue: {
            findOneById: jest.fn(() => {
              return Promise.resolve(mockCredentials);
            }),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => {
              return {
                toPromise: () => {
                  return Promise.resolve({
                    data: mockProduct,
                  });
                },
              };
            }),
          },
        },
      ],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    credentialsRepository = moduleRef.get<Repository<CredentialsEntity>>(
      getRepositoryToken(CredentialsEntity),
    );
  });

  it('Should be defined Products Service', () => {
    expect(productsService).toBeDefined();
  });

  it('Should be defined Credentials Entity', () => {
    expect(credentialsRepository).toBeDefined();
  });

  it('Should be return user', async () => {
    const user = await productsService.isUserValid(mockCredentials.user_id);
    expect(user).toEqual(mockCredentials);
  });

  it('Get Products Variants ordered by minor', async () => {
    const productsVariants = await productsService.getOrderProductByDiscount(
      mockCredentials.user_id,
      124406536,
      'minor',
    );
    expect(productsVariants).toEqual(mockResultMinor);
  });

  it('Get Products Variants ordered by major', async () => {
    const productsVariants = await productsService.getOrderProductByDiscount(
      mockCredentials.user_id,
      124406536,
      'major',
    );
    expect(productsVariants).toEqual(mockResultMajor);
  });
});
