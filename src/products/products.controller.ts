import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/products/product.entity';
import { IProduct } from 'src/products/IProduct';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllUsers(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  getUserById(@Param() params): Promise<Product[]> {
    return this.productsService.getProductById(params.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: Product })
  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth('JWT-auth')
  addNewUser(@Body() user: IProduct) {
    return this.productsService.addNewProduct(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: Product })
  @Put(':id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  @ApiBearerAuth('JWT-auth')
  updateUser(@Body() user: IProduct, @Param() params) {
    return this.productsService.updateProduct(user, params.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  @ApiBearerAuth('JWT-auth')
  deleteUser(@Param() params) {
    return this.productsService.deleteProduct(params.id);
  }
}
