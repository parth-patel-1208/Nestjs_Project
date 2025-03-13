import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CheckIn } from './check-ins.model';

@Injectable()
export class CheckInService {
  constructor(
    @InjectModel(CheckIn) private readonly checkInModel: typeof CheckIn
  ) {}

  // Employee Check-In
  async checkIn(employeeId: number): Promise<CheckIn> {
    return this.checkInModel.create({ employee_id: employeeId });
  }

  // Employee Check-Out
  async checkOut(employeeId: number): Promise<CheckIn> {
    const checkInRecord = await this.checkInModel.findOne({
      where: { employee_id: employeeId, status: 'Checked-In' },
    });

    if (!checkInRecord) {
      throw new NotFoundException('No active check-in found for this employee.');
    }

    checkInRecord.check_out = new Date();
    checkInRecord.status = 'Checked-Out';
    await checkInRecord.save();

    return checkInRecord;
  }

  // Get all check-ins
  async getCheckIns(): Promise<CheckIn[]> {
    return this.checkInModel.findAll();
  }
}
