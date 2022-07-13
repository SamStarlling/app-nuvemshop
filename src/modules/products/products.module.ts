import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsEntity } from '../entities/credentials.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([CredentialsEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
