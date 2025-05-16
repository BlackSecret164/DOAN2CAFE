import { IsArray, IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  phoneCustomer: string;

  @ApiProperty()
  @IsString()
  serviceType: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  totalPrice: number;

  @ApiProperty()
  @IsInt()
  staffID: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  tableID?: number;

  @ApiProperty()
  @IsDateString()
  orderDate: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty({ type: [Number] })
  @IsArray()
  productIDs: number[];
}

export class UpdateOrderDto {
  @ApiProperty()
  @IsString()
  phoneCustomer: string;

  @ApiProperty()
  @IsString()
  serviceType: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  totalPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  tableID?: number;

  @ApiProperty()
  @IsDateString()
  orderDate: string;

  @ApiProperty()
  @IsString()
  status: string;
}