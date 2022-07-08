import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CredentialsEntity } from './../entities/credentials.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(CredentialsEntity)
    private readonly credentialsRepository: Repository<CredentialsEntity>,
  ) {}

  getCredentials(user: object) {
    const { user_id, token } = user[0];
    return { user_id, token };
  }

  async getHttpRequest(url: string, token: string) {
    return await lastValueFrom(
      this.httpService.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Awesome App {samela.silva@nuvemshop.com.br}',
          Authentication: `bearer ${token}`,
        },
      }),
    );
  }
  async getProductsID(userId: number) {
    const user = await this.credentialsRepository.find(userId);
    const { user_id, token } = this.getCredentials(user);

    const url = `https://api.nuvemshop.com.br/v1/${user_id}/products?fields=id`;
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    const { data } = await this.getHttpRequest(url, token);
    return {
      data: data, //This is array of products ID
      url: `https://api.nuvemshop.com.br/v1/${user_id}/products`,
      user: token,
    };
    // return data;
  }
  async getAllProductsVariants(user_id: number, product_id: number) {
    const { url, user: token } = await this.getProductsID(user_id);
    // const productsVariant = [];
    // const fields = [
    //   'id',
    //   'product_id',
    //   'name',
    //   'price',
    //   'promotional_price',
    //   'stock',
    // ];
    const urlGetAllVariants = `${url}/${product_id}/variants`;
    // ?fields=${fields.join(',')}`;
    const { data } = await this.getHttpRequest(urlGetAllVariants, token);
    return data;
  }
  // getProductVariantsID(products: []): Array<IProductVariantsID> {
  //   return products.map((productArray: []) => {
  //     for (let index = 0; index < productArray.length; index += 1) {
  //       const { stock, id } = productArray[index];
  //       if (stock < 10) {
  //         return id;
  //       }
  //     }
  //   });
  // }
  // async changePriceOfProducts(product_id) {}
  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }
}
