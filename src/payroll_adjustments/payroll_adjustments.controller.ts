import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PayrollAdjustmentsService } from './payroll_adjustments.service';

@Controller('payroll-adjustments')
export class PayrollAdjustmentsController {
  constructor(private readonly payrollAdjustmentsService: PayrollAdjustmentsService) {}

  // Create a new adjustment (Bonus, Deduction, or Overtime)
  @Post('create')
  async createAdjustment(
    @Body() body: { employee_id: number; amount: number; type: 'bonus' | 'deduction' | 'overtime'; description?: string }
  ) {
    return this.payrollAdjustmentsService.createPayrollAdjustment(body.employee_id, body.amount, body.type, body.description);
  }

  // Get all payroll adjustments for an employee
  @Get(':employee_id')
  async getEmployeeAdjustments(@Param('employee_id') employee_id: number) {
    return this.payrollAdjustmentsService.getEmployeePayrollAdjustments(employee_id);
  }

  // Calculate salary adjustment for an employee
  @Get('calculate/:employee_id')
  async calculatePayroll(@Param('employee_id') employee_id: number) {
    return this.payrollAdjustmentsService.calculateEmployeePayroll(employee_id);
  }
}
