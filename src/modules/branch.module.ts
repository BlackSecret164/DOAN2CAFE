import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from '../entities/branches.entity';
import { BranchService } from '../services/branch.service';
import { BranchController } from '../controllers/branch.controller';
import { ProductModule } from '../modules/product.module';
import { ProductBranch } from '../entities/product_branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, ProductBranch]), ProductModule,],
  providers: [BranchService],
  controllers: [BranchController],
})
export class BranchModule {}
