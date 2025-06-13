import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from '../entities/branches.entity';
import { Repository } from 'typeorm';
import { CreateBranchDto } from '../dtos/branches.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepo: Repository<Branch>,
  ) {}

  async findAll(): Promise<Branch[]> {
  return this.branchRepo.find({
    relations: ['manager'], // Load quan hệ manager
    select: {
      id: true,
      name: true,
      address: true,
      phone: true,
      createdAt: true,
      manager: {
        id: true,
        name: true,
        phone: true,
      },
    },
  });
}

async findOne(id: number): Promise<Branch> {
  const branch = await this.branchRepo.findOne({
    where: { id },
    relations: ['manager'],
    select: {
      id: true,
      name: true,
      address: true,
      phone: true,
      createdAt: true,
      manager: {
        id: true,
        name: true,
        phone: true,
      },
    },
  });
  if (!branch) throw new NotFoundException(`Branch with id ${id} not found`);
  return branch;
}

  async create(dto: CreateBranchDto): Promise<Branch> {
    const newBranch = this.branchRepo.create(dto);
    return this.branchRepo.save(newBranch);
  }

  async update(id: number, dto: CreateBranchDto): Promise<Branch> {
    const branch = await this.findOne(id);
    const updated = this.branchRepo.merge(branch, dto);
    return this.branchRepo.save(updated);
  }

  async remove(id: number): Promise<{ message: string }> {
    const branch = await this.findOne(id);
    await this.branchRepo.remove(branch);
    return { message: 'Branch deleted successfully' };
  }
}
