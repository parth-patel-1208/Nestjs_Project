import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attendance } from './attendance.model';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

@Module({
  imports: [SequelizeModule.forFeature([Attendance])],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
