import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawMaterial } from '../entities/rawmaterial.entity';
import { RawMaterialDto } from '../dtos/rawmaterial.dto';

@Injectable()
export class RawMaterialService {
  constructor(
    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,
  ) {}

  async findAll(): Promise<RawMaterial[]> {
    return await this.rawMaterialRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<RawMaterial> {
    const rawMaterial = await this.rawMaterialRepository.findOne({ where: { id } });
    if (!rawMaterial) {
      throw new NotFoundException(`Raw material with ID ${id} not found`);
    }
    return rawMaterial;
  }

  async create(rawMaterialDto: RawMaterialDto): Promise<RawMaterial> {
    const rawMaterial = this.rawMaterialRepository.create(rawMaterialDto);
    return this.rawMaterialRepository.save(rawMaterial);
  }

  async update(id: number, rawMaterialDto: RawMaterialDto): Promise<RawMaterial> {
    const material = await this.findOne(id);
    const updated = this.rawMaterialRepository.merge(material, rawMaterialDto);
    return this.rawMaterialRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const rawMaterial = await this.findOne(id);
    await this.rawMaterialRepository.remove(rawMaterial);
  }
}
