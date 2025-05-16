import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { Constant } from 'src/commons/Constant';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: Constant.JWT_SECRET,
      signOptions: { expiresIn: Constant.JWT_EXPIRE },
    }),
    TypeOrmModule.forFeature([]), // nếu cần
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
