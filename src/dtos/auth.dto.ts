import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StaffSigninDto {
  @ApiProperty({ example: '0981234567' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
