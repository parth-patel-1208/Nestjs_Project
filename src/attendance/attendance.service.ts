import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attendance } from './attendance.model';
import { Op } from 'sequelize';  // Import Op for Sequelize operators

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,
  ) {}

  // Employee Check-In
  async checkIn(employeeId: number): Promise<Attendance> {
    return await this.attendanceModel.create({ employeeId });
  }

  // Employee Check-Out
  async checkOut(employeeId: number): Promise<Attendance> {
    const attendance = await this.attendanceModel.findOne({
      where: { employeeId, checkOut: null },
    });

    if (!attendance) {
      throw new NotFoundException('No active check-in found for this employee.');
    }

    attendance.checkOut = new Date();
    attendance.status = 'Checked-Out';
    await attendance.save();
    return attendance;
  }

  // Get Daily Report
  async getDailyReport() {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

    return await this.attendanceModel.findAll({
      where: {
        checkIn: {
          [Op.gte]: startOfDay,  // Start of the day
          [Op.lte]: endOfDay,    // End of the day
        },
      },
    });
  }

  // Get Weekly Report
  async getWeeklyReport() {
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return await this.attendanceModel.findAll({
      where: {
        checkIn: {
          [Op.gte]: lastWeek,
        },
      },
    });
  }

  // Get Monthly Report
  async getMonthlyReport() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    return await this.attendanceModel.findAll({
      where: {
        checkIn: {
          [Op.gte]: startOfMonth,
          [Op.lt]: startOfNextMonth,
        },
      },
    });
  }
}
