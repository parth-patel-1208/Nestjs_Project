// src/salary/salary.module.ts
import { Module } from '@nestjs/common';
import { SalaryCalculatorService } from './salary-calculator.service';

@Module({
  providers: [SalaryCalculatorService],
  exports: [SalaryCalculatorService],  // Export SalaryCalculatorService
})
export class SalaryModule {}
