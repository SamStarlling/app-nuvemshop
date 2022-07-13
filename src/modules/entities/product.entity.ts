import { BadRequestException } from '@nestjs/common';
export class ProductsEntity {
  id: number;
  product_id: number;
  name: string;
  price: number;
  promotional_price: number | null;
  stock: number;

  constructor(productsInfo) {
    const infos = [
      'id',
      'product_id',
      'name',
      'price',
      'promotional_price',
      'stock',
    ];
    const keys = Object.keys(productsInfo);
    if (!infos.every((info) => keys.includes(info))) {
      throw new BadRequestException('Missing products Information');
    }
    this.id = productsInfo.id;
    this.product_id = productsInfo.product_id;
    this.name = productsInfo.name;
    this.price = productsInfo.price;
    this.promotional_price = productsInfo.promotional_price;
    this.stock = productsInfo.stock;
  }
}
