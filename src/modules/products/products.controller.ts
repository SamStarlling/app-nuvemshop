import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findProductById(
    @Query('user_id') user_id: string,
    @Query('product_id') product_id: string,
  ) {
    return await this.productsService.getProductById(
      parseInt(user_id),
      parseInt(product_id),
    );
  }

  @Get('variants')
  async findAllVariantsOfProductOrdered(
    @Query('user_id') user_id: string,
    @Query('product_id') product_id: string,
    @Query('order') order: string,
  ) {
    return await this.productsService.getOrderProductByDiscount(
      parseInt(user_id),
      parseInt(product_id),
      order,
    );
  }
}
