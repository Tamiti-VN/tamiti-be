export class ProductResponseDto {
  id: number;
  name: string;
  description: string;
  image: string;

  // product price
  prices: { size: string, price?: number }[];

  // product category
  categories?: { name: string }[];
}
