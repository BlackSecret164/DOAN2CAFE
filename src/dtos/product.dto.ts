import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsBoolean()
  available: boolean;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  upsize: number;

  @ApiProperty()
  @IsBoolean()
  sizes: boolean;

  @ApiProperty()
  @IsBoolean()
  sizem: boolean;

  @ApiProperty()
  @IsBoolean()
  sizel: boolean;

  @ApiProperty()
  @IsBoolean()
  hot: boolean;

  @ApiProperty()
  @IsBoolean()
  cold: boolean;

  @ApiProperty({ type: [String] })
  @IsOptional()
  materials: number[];
}

export class UpdateStatusDto{
  @ApiProperty()
  @IsBoolean()
  available: boolean;
}