import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { ProductRating } from 'src/products/productRating.entity';
import { IProduct } from 'src/products/IProduct';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductRating)
    private productRatingsRepository: Repository<ProductRating>,
  ) {}
  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }
  async getProductById(data: number): Promise<Product[]> {
    const product = await this.productsRepository.findOne({
      where: { id: data },
    });
    return [product];
  }
  async addNewProduct(data: IProduct): Promise<Product[]> {
    const productRating = new ProductRating();
    productRating.rate = data.rating.rate;

    const product = new Product();
    product.title = data.title;
    product.tenantId = data.tenantId;
    product.description = data.description;
    product.category = data.category;
    product.image = data.image;
    product.price = data.price;
    product.rating = productRating;

    await this.productsRepository.save(product);
    return await this.findAll();
  }
  async updateProduct(data: IProduct, id: number): Promise<Product[]> {
    await this.productsRepository
      .createQueryBuilder()
      .update(Product)
      .set({
        title: data.title,
        tenantId: data.tenantId,
        description: data.description,
        category: data.category,
        image: data.image,
        price: data.price,
      })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    await this.productRatingsRepository
      .createQueryBuilder()
      .update(ProductRating)
      .set({
        rate: data.rating.rate,
      })
      .where({
        productId: id,
      })
      .returning('*')
      .execute();

    return await this.getProductById(id);
  }

  async deleteProduct(data: number) {
    const result = await this.productsRepository.delete({ id: data });
    return result;
  }
}
