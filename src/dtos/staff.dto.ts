import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsDate, IsBoolean, MaxLength, IsDateString, IsInt } from 'class-validator';

export class StaffDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  birth: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNumber()
  workHours: number;

  @ApiProperty()
  @IsNumber()
  salary: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  typeStaff: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  startDate: string;

  @ApiProperty()
  @IsBoolean()
  activeStatus: boolean;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNumber()
  minsalary: number;

  @ApiProperty()
  @IsString()
  role: string;
}

export class UpdateStaffDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  gender?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birth?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(40)
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  workHours?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  minsalary?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  typeStaff?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate?: string;
}