import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductPrice } from './entities/product-price.entity';
import { ProductCategory } from './entities/product-category.entity';
import { Category } from './entities/category.entity';
import { ProductPricesService } from './services/product-prices.service';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductPrice, ProductCategory, Category])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductPricesService, CategoriesService],
})
export class ProductsModule { }
