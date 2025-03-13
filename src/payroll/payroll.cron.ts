// src/payroll/payroll.cron.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PayrollService } from './payroll.service';

@Injectable()
export class PayrollCron {
  constructor(private readonly payrollService: PayrollService) {}

  @Cron('0 0 1 * *') // Runs on the 1st of every month at midnight
  async handleCron() {
    console.log('Running Monthly Payroll Processing...');
    await this.payrollService.processSalary(new Date().toISOString().split('T')[0]);
  }
}
