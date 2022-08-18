export class ProductDto {
  id: number;
  tenantId: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

class ProductRating {
  rate: number;
  count: number;
}
