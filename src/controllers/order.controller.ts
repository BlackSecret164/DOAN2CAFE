import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/order.dto';
import { CreateOrderDetailsDto } from 'src/dtos/order-details.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
//import { CreateFullOrderDto } from 'src/dtos/create-full-order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/list')
  @ApiOperation({ summary: 'Get list of all orders' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get('/new')
  @ApiOperation({ summary: 'Get latest order' })
  findLatest() {
    return this.orderService.findLatest();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create order only (no details)' })
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  // @Post('/full')
  // @ApiOperation({ summary: 'Create order with details (transaction)' })
  // createFull(@Body() dto: CreateFullOrderDto) {
  //   return this.orderService.createFull(dto);
  // }

  @Put(':id')
  @ApiOperation({ summary: 'Update order by ID' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateOrderDto) {
    return this.orderService.update(id, dto);
  }

  @Put('/complete/:id')
  @ApiOperation({ summary: 'Mark order as completed' })
  complete(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.markComplete(id);
  }

  @Put('/cancel/:id')
  @ApiOperation({ summary: 'Mark order as cancelled' })
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.markCancel(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }

  @Post('/detail/:id')
  @ApiOperation({ summary: 'Add product to existing order' })
  addDetail(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateOrderDetailsDto) {
    return this.orderService.addDetail(id, dto);
  }
}
