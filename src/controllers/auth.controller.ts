import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { StaffSigninDto } from '../dtos/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Đăng nhập' })
  async signin(@Body() dto: StaffSigninDto) {
    return this.authService.signin(dto);
  }

  @Get('callback')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Callback: trả thông tin user và ghi log' })
  async callback(@Headers('Authorization') authHeader: string) {
    return this.authService.callback(authHeader);
  }
}
