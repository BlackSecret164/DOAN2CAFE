import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class StaffSigninDto {
  @ApiProperty({ example: '0111111111' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'admin123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'staff', enum: ['staff', 'customer'] })
  @IsNotEmpty()
  @IsIn(['staff', 'customer'])
  userType: 'staff' | 'customer';
}
