import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from 'src/entities/category.entity';
import { ICategories } from 'src/interfaces/ICategories';
import { CategoriesService } from 'src/services/categories.sevice';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllUsers(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getUserById(@Param() params): Promise<Category[]> {
    return this.categoriesService.getCategoryById(params.id);
  }

  @Post()
  addNewUser(@Body() category: ICategories) {
    return this.categoriesService.addNewCategory(category);
  }

  @Put(':id')
  updateUser(@Body() category: ICategories, @Param() params) {
    return this.categoriesService.updateCategory(category, params.id);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.categoriesService.deleteCategory(params.id);
  }
}
