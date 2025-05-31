import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from '../entities/branches.entity';
import { BranchService } from '../services/branch.service';
import { BranchController } from '../controllers/branch.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  providers: [BranchService],
  controllers: [BranchController],
})
export class BranchModule {}
