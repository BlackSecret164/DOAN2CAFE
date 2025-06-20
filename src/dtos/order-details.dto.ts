import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDetailsDto {
  @ApiProperty()
  @IsNumber()
  orderID: number;

  @ApiProperty()
  @IsNumber()
  productID: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsString()
  size: string;

  @ApiProperty()
  @IsString()
  mood: string;
}
