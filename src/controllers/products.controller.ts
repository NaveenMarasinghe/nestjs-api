import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { IProduct } from 'src/interfaces/IProduct';
import { ProductDto } from 'src/interfaces/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): IProduct[] {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param() params): IProduct[] {
    return this.productsService.getProductById(params.id);
  }

  @Post('/add')
  addNewProduct(@Body() product: ProductDto) {
    return this.productsService.addNewProduct(product);
  }

  @Put(':id')
  updateProduct(@Param() params: IProduct, @Body() product: ProductDto) {
    return this.productsService.updateProduct(params.id, product);
  }
}
