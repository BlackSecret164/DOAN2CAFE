// src/services/table.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from '../entities/tables.entity';
import { TableDto } from '../dtos/tables.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async findAll(): Promise<Table[]> {
    return this.tableRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Table> {
    const table = await this.tableRepository.findOne({ where: { id } });
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    return table;
  }

  async create(tableDto: TableDto): Promise<Table> {
    const table = this.tableRepository.create(tableDto);
    return this.tableRepository.save(table);
  }

  async update(id: number, tableDto: Partial<TableDto>): Promise<Table> {
    const table = await this.findOne(id);
    Object.assign(table, {
      ...tableDto,
      bookingTime: tableDto.bookingTime || null,
      seatingTime: tableDto.seatingTime || null,
    });
    return this.tableRepository.save(table);
  }

  async completeTable(id: number): Promise<Table> {
    const table = await this.findOne(id);
    table.status = 'Available';
    table.phoneOrder = null;
    table.name = null;
    table.bookingTime = null;
    table.seatingTime = null;
    return this.tableRepository.save(table);
  }

  async remove(id: number): Promise<void> {
    const table = await this.findOne(id);
    await this.tableRepository.remove(table);
  }
}
