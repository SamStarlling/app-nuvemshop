import { HttpService } from '@nestjs/axios';
import { CredentialsEntity } from './../entities/credentials.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface IProducts {
  product_id: number;
  discountValue: string;
  id: number;
  price: string;
  promotional_price: string;
  stock: number;
}
@Injectable()
export class ProductsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(CredentialsEntity)
    private credentialsRepository: Repository<CredentialsEntity>,
  ) {}

  async isUserValid(userId: number) {
    const user = await this.credentialsRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException(`User not found!`);
    }
    return user;
  }

  async getHttpRequest(url: string, token: string) {
    return await this.httpService
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Awesome App {samela.silva@nuvemshop.com.br}',
          Authentication: `bearer ${token}`,
        },
      })
      .toPromise();
  }

  getValueOfDiscountAndIdVariants(data: []) {
    const arrayOfDiscountAndId = [];
    data.map((product) => {
      const {
        id: variant_id,
        product_id,
        price,
        promotional_price,
        stock,
      } = product;
      const discountValue = !promotional_price
        ? 0
        : (price - promotional_price).toFixed(2);
      arrayOfDiscountAndId.push({
        discountValue,
        product_id,
        variant_id,
        price,
        promotional_price,
        stock,
      });
    });
    return arrayOfDiscountAndId;
  }

  getCompareOfProductsToMajor(product1: IProducts, product2: IProducts) {
    if (product1.discountValue > product2.discountValue) return -1;
    if (product1.discountValue < product2.discountValue) return 1;
    if (product1.discountValue === product2.discountValue) return 0;
    if (!product1.discountValue) return +1;
  }

  getCompareOfProductsToMinor(product1: IProducts, product2: IProducts) {
    if (product1.discountValue < product2.discountValue) return -1;
    if (product1.discountValue > product2.discountValue) return 1;
    if (product1.discountValue === product2.discountValue) return 0;
    if (!product1.discountValue) return +1;
  }

  getOrderProducts(data: [], order: string) {
    const arrayDiscountAndIdVariants =
      this.getValueOfDiscountAndIdVariants(data);
    if (order === 'major') {
      return arrayDiscountAndIdVariants.sort(this.getCompareOfProductsToMajor);
    }
    return arrayDiscountAndIdVariants.sort(this.getCompareOfProductsToMinor);
  }

  isOrderValid(order: string) {
    if (!order) {
      throw new BadRequestException(
        'Params were not passed! You must pass params like order=minor or order=major',
      );
    } else if (
      order.toLocaleLowerCase() !== 'minor' &&
      order.toLocaleLowerCase() !== 'major'
    ) {
      throw new BadRequestException(
        'You passed wrong parameter to order the products. This must be minor or major',
      );
    }
  }

  async getProductById(userId: number, product_id: number) {
    const user = await this.isUserValid(userId);
    const { user_id, token } = user;

    const url = `https://api.nuvemshop.com.br/v1/${user_id}/products/${product_id}`;

    const { data } = await this.getHttpRequest(url, token);
    return data;
  }

  async getOrderProductByDiscount(
    userId: number,
    product_id: number,
    order?: string,
  ) {
    const user = await this.isUserValid(userId);
    const { user_id, token } = user;

    const url = `https://api.nuvemshop.com.br/v1/${user_id}/products/${product_id}/variants?fields=id,product_id,price,promotional_price,stock`;

    const { data: arrayOfProductVariants } = await this.getHttpRequest(
      url,
      token,
    );

    if (arrayOfProductVariants.length > 1) {
      return this.getOrderProducts(arrayOfProductVariants, order);
    }
    return arrayOfProductVariants;
  }
}
