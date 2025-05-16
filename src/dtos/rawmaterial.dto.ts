import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class RawMaterialDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  quantityImported: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  quantityStock: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  storageType: string;

  @ApiProperty()
  @IsDate()
  importDate: string;

  @ApiProperty()
  @IsDate()
  expiryDate: string;
}
