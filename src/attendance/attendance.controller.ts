import { Controller, Post, Param, Get } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.model';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // Check-In Endpoint
  @Post('check-in/:employeeId')
  async checkIn(@Param('employeeId') employeeId: number): Promise<Attendance> {
    return this.attendanceService.checkIn(employeeId);
  }

  // Check-Out Endpoint
  @Post('check-out/:employeeId')
  async checkOut(@Param('employeeId') employeeId: number): Promise<Attendance> {
    return this.attendanceService.checkOut(employeeId);
  }

  // Get Daily Report
  @Get('daily-report')
  async getDailyReport() {
    return this.attendanceService.getDailyReport();
  }

  // Get Weekly Report
  @Get('weekly-report')
  async getWeeklyReport() {
    return this.attendanceService.getWeeklyReport();
  }

  // Get Monthly Report
  @Get('monthly-report')
  async getMonthlyReport() {
    return this.attendanceService.getMonthlyReport();
  }
}
