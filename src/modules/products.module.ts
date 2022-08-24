import { Module } from '@nestjs/common';
import { ProductsController } from '../controllers/products.controller';
import { ProductsService } from '../services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductRating } from 'src/entities/productRating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductRating])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
