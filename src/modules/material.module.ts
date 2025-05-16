import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterialController } from '../controllers/material.controller';
import { RawMaterialService } from '../services/material.service';
import { RawMaterial } from '../entities/rawmaterial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial])],  // Import RawMaterial entity
  controllers: [RawMaterialController],
  providers: [RawMaterialService],
})
export class RawMaterialModule {}
