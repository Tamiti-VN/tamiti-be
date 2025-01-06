import { CategoriesService } from './categories.service';
import { ProductPricesService } from './product-prices.service';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductResponseDto } from '../dto/product-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly productPricesService: ProductPricesService,
    private readonly categoriesService: CategoriesService
  ) { }

  async create(createProductDto: CreateProductDto) {
    const { name, description, prices, categories } = createProductDto;

    const tempProduct = new Product();
    tempProduct.name = name;
    tempProduct.description = description;

    // 1: save product
    await this.productRepository.save(tempProduct);
    // 2: save product price
    if (prices) {
      await this.productPricesService.attachPricesToProduct(tempProduct, prices);
    }
    // 3: save category
    if (categories) {
      this.categoriesService.attachCategoriesToProduct(tempProduct, categories);
    }

    return await this.productRepository.save(tempProduct);
  }

  async findAll(): Promise<Product[]> {
    // Todo here!
    return await this.productRepository.find({
      relations: ['productCategories', 'productCategories.category', 'prices']
    });
  }

  async findOneById(id: number): Promise<Product> {
    // Todo here!
    return await this.productRepository.findOne({
      where: { id },
      relations: ['productCategories', 'productCategories.category', 'prices']
    });
  }

  async removeById(id: number): Promise<{ message: string }> {
    const product = await this.findOneById(id);

    if (!product) {
      return { message: `Product with ID ${id} not found` };
    }

    // (1) remove product_price
    await this.productPricesService.removeProductPricesByProduct(product);
    // (2) remove product_category
    await this.categoriesService.removeProductCategoriesByProduct(product);
    // (3) remove product
    await this.productRepository.remove(product);

    // return message success
    return { message: `Product with ID ${id} has been removed` };
  }

  public productToProductResponseDto(product: Product): ProductResponseDto {
    const categories = product.productCategories.map(pc => pc.category);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      prices: product.prices,
      categories: categories
    };
  }

  // async findAll(): Promise<ProductResponseDto[]> {
  //   const products = await this.productRepository.find({
  //     relations: ['productCategories', 'productCategories.category', 'prices']
  //   });

  //   return products.map(product => this.productToProductResponseDto(product));
  // }

  // async findOneById(id: number): Promise<ProductResponseDto> {
  //   // Todo here!
  //   // return await this.productRepository.findOne({ where: { id }, relations: ['categories', 'prices'] });

  //   const product = await this.productRepository.findOne({
  //     where: { id },
  //     relations: ['productCategories', 'productCategories.category', 'prices']
  //   });

  //   return this.productToProductResponseDto(product);
  // }

  // async findAll(): Promise<Product[]> {
  //   // Todo here!
  //   return await this.productRepository.find({
  //     relations: ['productCategories', 'productCategories.category', 'prices']
  //   });
  // }

  // async create(createProductDto: CreateProductDto): Promise<Product> {
  //   Todo here!
  //   const tempProduct = this.productRepository.create({
  //     name: createProductDto.name,
  //     description: createProductDto.description,
  //     image: createProductDto.image
  //   });

  //   const savedProduct = await this.productRepository.save(tempProduct);

  //   const prices = createProductDto.prices.map(priceDto => {
  //     const price = new ProductPrice();
  //     price.size = priceDto.size;
  //     price.price = priceDto.price;
  //     price.product = savedProduct;

  //     return price;
  //   });

  //   const categories = createProductDto.categories.map(categoryDto => {
  //     const category = new ProductCategory();
  //     category.name = categoryDto.name;
  //     category.product = savedProduct;

  //     return category;
  //   });

  //   await this.productPriceRepository.save(prices);
  //   await this.productCategoryRepository.save(categories);

  //   return savedProduct;
  // }

  // async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
  // }

  // async handleRemoveById(id: number): Promise<Product> {
  //   const product = await this.handleFetchOneById(id);

  //   return this.productRepository.remove(product);
  // }

  // async handleFetchOneById(id: number): Promise<Product> {
  //   // Todo here!
  //   return await this.productRepository.findOne({ where: { id }, relations: ['categories', 'prices'] });
  // }

}
