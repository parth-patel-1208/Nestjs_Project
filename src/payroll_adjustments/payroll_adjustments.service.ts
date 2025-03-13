import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PayrollAdjustment } from './payroll_adjustments.model';

@Injectable()
export class PayrollAdjustmentsService {
  constructor(
    @InjectModel(PayrollAdjustment) private payrollAdjustmentModel: typeof PayrollAdjustment,
  ) {}

  // Add Bonus, Deduction, or Overtime
  async createPayrollAdjustment(
    employee_id: number,
    amount: number,
    type: 'bonus' | 'deduction' | 'overtime',
    description?: string,
  ): Promise<PayrollAdjustment> {
    return await this.payrollAdjustmentModel.create({
      employee_id: employee_id,
      amount: amount,
      type: type,
      description: description,
    });
  }

  // Get all payroll adjustments for an employee
  async getEmployeePayrollAdjustments(employee_id: number) {
    return await this.payrollAdjustmentModel.findAll({ where: { employee_id: employee_id } });
  }

  // Calculate total salary adjustment
  async calculateEmployeePayroll(employee_id: number) {
    const adjustments = await this.getEmployeePayrollAdjustments(employee_id);

    let totalBonus = 0;
    let totalDeductions = 0;
    let totalOvertime = 0;

    for (const adj of adjustments) {
      if (adj.type === 'bonus') totalBonus += adj.amount;
      if (adj.type === 'deduction') totalDeductions += adj.amount;
      if (adj.type === 'overtime') totalOvertime += adj.amount;
    }

    return {
      totalBonus,
      totalDeductions,
      totalOvertime,
      finalAdjustment: totalBonus + totalOvertime - totalDeductions,
    };
  }
}
