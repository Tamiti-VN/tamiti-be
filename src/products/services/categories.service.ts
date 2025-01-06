import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductCategory } from '../entities/product-category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductCategory) private readonly productCategoryRepository: Repository<ProductCategory>
  ) { }

  async findOneByName(categoryName: string): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { name: categoryName } });
  }

  async create(category: { name: string }): Promise<Category> {
    return await this.categoryRepository.save(category);
  }

  async findOneOrCreate(categoryName: string): Promise<Category> {
    const categoryDb = await this.findOneByName(categoryName);

    if (categoryDb == null) {
      const tempCategory = new Category();
      tempCategory.name = categoryName;

      return await this.create(tempCategory);
    }

    return categoryDb;
  }

  async removeProductCategoriesByProduct(product: Product): Promise<void> {
    await this.productCategoryRepository.remove(product.productCategories);
  }

  async attachCategoriesToProduct(product: Product, categories: { name: string }[]): Promise<void> {
    for (const category of categories) {
      const tempCategory = await this.findOneOrCreate(category.name);

      const productCategory = new ProductCategory();
      productCategory.product = product;
      productCategory.category = tempCategory;

      await this.productCategoryRepository.save(productCategory);
    }
  }
}
