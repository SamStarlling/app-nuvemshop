import { Controller, Get, Query } from '@nestjs/common';
import { query } from 'express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async findAllProductsId(@Query('user_id') user_id: string) {
    return await this.productsService.getProductsID(parseInt(user_id));
  }

  @Get('variants')
  async findProductIdVariants(
    @Query('user_id') user_id: string,
    @Query('product_id') product_id: string,
  ) {
    return await this.productsService.getAllProductsVariants(
      parseInt(user_id),
      parseInt(product_id),
    );
  }
}
