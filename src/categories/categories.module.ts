import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/category.entity';
import { CategoriesController } from 'src/categories/categories.controller';
import { CategoriesService } from 'src/categories/categories.sevice';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User]), UsersModule],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class CategoriesModule {}
