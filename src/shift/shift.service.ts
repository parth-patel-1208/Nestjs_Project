// shift.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shift } from './shift.model';
import { Employee } from '../employees/employee.model';

@Injectable()
export class ShiftService {
  constructor(
    @InjectModel(Shift)
    private shiftModel: typeof Shift,
    @InjectModel(Employee)
    private employeeModel: typeof Employee,
  ) {}

  async assignShift(employeeId: number, shiftType: string, shiftDate: string) {
    const employee = await this.employeeModel.findByPk(employeeId);
    if (!employee) throw new Error('Employee not found');

    const shift = await this.shiftModel.create({
      employee_id: employeeId,
      shift_type: shiftType,
      shift_date: shiftDate,
      status: 'Assigned',
    });

    return shift;
  }

  async getEmployeeShifts(employeeId: number) {
    return this.shiftModel.findAll({ where: { employee_id: employeeId } });
  }

  async getAllShifts() {
    return this.shiftModel.findAll();
  }

  async updateShiftStatus(shiftId: number, status: string) {
    const shift = await this.shiftModel.findByPk(shiftId);
    if (!shift) throw new Error('Shift not found');
    shift.status = status;
    await shift.save();
    return shift;
  }
}
