// src/payroll/payroll.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { PaymentModule } from '../payment/payment.module';  // Import PaymentModule for PaymentService
import { SalaryModule } from '../salary/salary.module';      // Import SalaryModule for SalaryCalculatorService
import { PayrollLog } from './payroll-log.model';
import { Employee } from '../employees/employee.model';
import { PaymentService } from '../payment/payment.service';
import { SalaryCalculatorService } from '../salary/salary-calculator.service';

@Module({
  imports: [
    SequelizeModule.forFeature([PayrollLog, Employee]),  // Register PayrollLog and Employee models
    PaymentModule,  // Ensure PaymentModule is imported for PaymentService
    SalaryModule,   // Ensure SalaryModule is imported for SalaryCalculatorService
  ],
  controllers: [PayrollController],
  providers: [PayrollService, PaymentService, SalaryCalculatorService],  // Providers include PaymentService and SalaryCalculatorService
  exports: [PayrollService],  // Export PayrollService to make it available for other modules
})
export class PayrollModule {}
