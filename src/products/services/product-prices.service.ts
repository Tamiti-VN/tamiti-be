import { Injectable } from '@nestjs/common';
import { ProductPrice } from '../entities/product-price.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductPricesService {
  constructor(
    @InjectRepository(ProductPrice) private readonly productPriceRepository: Repository<ProductPrice>
  ) { }

  async create(product: Product, productPrice: { size: string; price?: number }): Promise<ProductPrice> {
    const tempProductPrice = new ProductPrice();

    tempProductPrice.size = productPrice.size;
    tempProductPrice.price = productPrice.price ? productPrice.price : 0;
    tempProductPrice.product = product;

    return await this.productPriceRepository.save(tempProductPrice);
  }

  async removeProductPricesByProduct(product: Product): Promise<void> {
    await this.productPriceRepository.remove(product.prices);
  }

  async attachPricesToProduct(product: Product, prices: { size: string, price?: number }[]): Promise<void> {
    for (const price of prices) {
      await this.create(product, price);
    }
  }
}
