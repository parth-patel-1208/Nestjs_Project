// src/payroll-log/dto/create-payroll-log.dto.ts

export class PayrollLogDto {
    employeeid: number;
    amount: number;
    status: string;
    message?: string;
  }
  