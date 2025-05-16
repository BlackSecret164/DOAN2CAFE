// src/controllers/table.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TableService } from '../services/table.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TableDto } from '../dtos/tables.dto';
import { Table } from '../entities/tables.entity';

@ApiTags('Table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get('/list')
  @ApiOperation({ summary: 'Get list of tables' })
  @ApiResponse({ status: 200, type: [Table] })
  findAll() {
    return this.tableService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get table by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tableService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new table' })
  create(@Body() tableDto: TableDto) {
    return this.tableService.create(tableDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update table by ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() tableDto: TableDto, // giờ đã có metadata đầy đủ
  ) {
  return this.tableService.update(id, tableDto);
}


  @Put('/complete/:id')
  @ApiOperation({ summary: 'Reset/Complete table by ID' })
  complete(@Param('id', ParseIntPipe) id: number) {
    return this.tableService.completeTable(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete table by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tableService.remove(id);
  }
}
