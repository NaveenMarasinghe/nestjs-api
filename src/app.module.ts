import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductsModule } from './products/products.module';
import { TenantsModule } from './tenants/tenants.module';
import { CategoriesModule } from './categories/categories.module';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Tenant } from './tenants/tenant.entity';
import { Category } from './categories/category.entity';
import { ProductRating } from './products/productRating.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    TenantsModule,
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [User, Product, Tenant, Category, ProductRating],
      synchronize: true,
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
