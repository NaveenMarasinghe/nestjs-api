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
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Category } from 'src/categories/category.entity';
import { ICategories } from 'src/categories/ICategories';
import { CategoriesService } from 'src/categories/categories.sevice';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(Role.Admin)
  getAllUsers(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getUserById(@Param() params): Promise<Category[]> {
    return this.categoriesService.getCategoryById(params.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: Category })
  @Post()
  @Roles(Role.Admin)
  addNewUser(@Body() category: ICategories) {
    return this.categoriesService.addNewCategory(category);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: Category })
  @Put('/:id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  updateUser(@Body() category: ICategories, @Param() params) {
    return this.categoriesService.updateCategory(category, params.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  deleteUser(@Param() params) {
    return this.categoriesService.deleteCategory(params.id);
  }
}
