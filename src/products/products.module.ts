import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { ProductRating } from 'src/products/productRating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductRating])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
