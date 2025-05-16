import { Controller, Get } from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('system')
  getSystemReport() {
    return this.reportService.getSystemReport();
  }
}
