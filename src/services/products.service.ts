import { Injectable } from '@nestjs/common';
import find from '../helpers/find.helper';
import { addToJson, updateJson, deleteJson } from '../helpers/jsonFile.helper';
import { IProduct } from '../interfaces/IProduct';
import products from '../mocks/products.json';

@Injectable()
export class ProductsService {
  datasource: IProduct[];
  jsonFileLocation: string;

  constructor() {
    this.datasource = products;
    this.jsonFileLocation = '../mocks/products.json';
  }

  getAllProducts(): IProduct[] {
    return find<IProduct>({ dataset: this.datasource });
  }

  getProductById(id: string) {
    return find<IProduct, number>({
      dataset: this.datasource,
      key: 'id',
      value: +id,
    });
  }

  addNewProduct(data: IProduct) {
    return addToJson({ dataset: data, dataFile: this.jsonFileLocation });
  }

  updateProduct(id: number, data: IProduct) {
    return updateJson({
      id: id,
      dataset: data,
      dataFile: this.jsonFileLocation,
    });
  }

  deleteProduct(id: number) {
    return deleteJson({
      id: id,
      dataFile: this.jsonFileLocation,
    });
  }
}
