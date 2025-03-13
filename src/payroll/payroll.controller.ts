// src/payroll-log/payroll-log.controller.ts

import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollLog } from './payroll-log.model';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollLogService: PayrollService) {}

  // Endpoint to create a payroll log
  @Post('create')
  async PayrollLog(@Body() PayrollLogDto: { employeeid: number; amount: number; status: string; message?: string }): Promise<PayrollLog> {
    const { employeeid, amount, status, message } = PayrollLogDto;
    return this.payrollLogService.createPayrollLog(employeeid, amount, status, message);
  }

  // Endpoint to get payroll logs by employee ID
  @Get(':employeeId')
  async getPayrollLogsByEmployeeId(@Param('employeeId') employeeId: number): Promise<PayrollLog[]> {
    return this.payrollLogService.getPayrollLogsByEmployeeId(employeeId);
  }

  // Endpoint to get all payroll logs
  @Get()
  async getAllPayrollLogs(): Promise<PayrollLog[]> {
    return this.payrollLogService.getAllPayrollLogs();
  }
}
