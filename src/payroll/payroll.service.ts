// src/payroll-log/payroll-log.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PayrollLog } from './payroll-log.model';
import { Employee } from '../employees/employee.model';  // Ensure Employee model is imported

@Injectable()
export class PayrollService {
  processSalary(arg0: string) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(PayrollLog) private payrollLogModel: typeof PayrollLog,
    @InjectModel(Employee) private employeeModel: typeof Employee,  // Inject Employee model
  ) {}
  async createPayrollLog(
    employeeid: number,
    amount: number,
    status: string,
    message: string,
  ): Promise<PayrollLog> {
    // Validate input parameters if necessary
    if (!employeeid || !amount || !status || !message) {
      throw new Error('Invalid input data');
    }

    // Check if employee exists
    const employee = await this.employeeModel.findOne({ where: { id: employeeid } });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Proceed to create PayrollLog
    const payrollLog = await this.payrollLogModel.create({
      employeeId: employeeid,  // Ensure this matches the column name in your table
      amount: amount,
      status: status,
      message: message,
    });

    return payrollLog;
  }

  // Retrieve all payroll logs for a specific employee
  async getPayrollLogsByEmployeeId(employeeId: number): Promise<PayrollLog[]> {
    return this.payrollLogModel.findAll({
      where: { employeeId: employeeId },
    });
  }

  // Retrieve all payroll logs
  async getAllPayrollLogs(): Promise<PayrollLog[]> {
    return this.payrollLogModel.findAll();
  }
}
