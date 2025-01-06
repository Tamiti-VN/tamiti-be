import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    // Todo Here!
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    // Todo Here!
    const products = await this.productsService.findAll();

    return products.map(product => this.productsService.productToProductResponseDto(product));
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    // Todo Here!
    const product = await this.productsService.findOneById(+id);

    return this.productsService.productToProductResponseDto(product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.removeById(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Get()
  // findAll(): Promise<Product[]> {
  //   // Todo Here!
  //   return this.productsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
