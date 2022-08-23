import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductsModule } from './modules/products.module';
import { TenantsModule } from './modules/tenants.module';
import { CategoriesModule } from './modules/categories.module';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Tenant } from './entities/tenant.entity';
import { Category } from './entities/category.entity';
import { ProductRating } from './entities/productRating.entity';

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
