import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { StaffDto } from '../dtos/staff.dto';
import { StaffSigninDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async signin(dto: StaffSigninDto) {
    const { phone, password } = dto;

    const result = await this.dataSource.query(
      'SELECT * FROM staff WHERE phone = $1',
      [phone],
    );

    if (result.length === 0) {
      throw new UnauthorizedException('Phone number not found!');
    }

    const user = result[0];

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password!');
    }

    const token = this.jwtService.sign({
      id: user.id,
      phone: user.phone,
      role: user.role,
    });

    return {
      message: 'Signin successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    };
  }

  async callback(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    const staffID = decoded.id;

    const userResult = await this.dataSource.query(
      `SELECT id, name, gender, birth, address, phone, workhours as "workHours", minsalary, typestaff as "typeStaff", role FROM staff WHERE id = $1`,
      [staffID],
    );

    if (userResult.length === 0) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = userResult[0];

    await this.dataSource.query(
      `INSERT INTO activity_logs (staffid, action, timestamp) VALUES ($1, $2, $3)`,
      [user.id, 'User accessed callback API', new Date()],
    );

    return {
      msg: 'ok',
      data: user,
    };
  }
}
