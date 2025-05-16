import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { StaffService } from '../services/staff.service';
import { StaffDto, UpdateStaffDto } from 'src/dtos/staff.dto';
import { ApiTags, ApiOperation, ApiResponse,ApiBody } from '@nestjs/swagger';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get('/list')
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.staffService.findOne(id);
  }

  @Post()
  create(@Body() staffDto: StaffDto) {
    return this.staffService.create(staffDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateStaffDto })
  update(@Param('id') id: number, @Body() updatestaffDto: UpdateStaffDto) {
    return this.staffService.update(id, updatestaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.staffService.remove(id);
  }
}
