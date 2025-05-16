import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateStatusDto } from '../dtos/product.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/list')
  @ApiOperation({ summary: 'Get list of products' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateProductDto,
  ) {
    return this.productService.update(id, dto);
  }

  @Put('/available/:id')
  @ApiOperation({ summary: 'Update availability of a product' })
  updateAvailability(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.productService.updateAvailability(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
