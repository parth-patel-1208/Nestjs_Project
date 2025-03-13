// src/salary/salary-calculator.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SalaryCalculatorService {
  calculateNetSalary(
    basicSalary: number,
    totalDeductions: number,
    taxAmount: number,
    pfAmount: number,
    professionalTax: number,
  ): number {
    return (
      basicSalary - 
      totalDeductions - 
      taxAmount - 
      pfAmount - 
      professionalTax
    );
  }
}
