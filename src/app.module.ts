// import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { EmployeeModule } from './employees/employee.module';
// import { CompanyModule } from './company/company.module';
// import { ImageModule } from './image/image.module';
// import { Employee } from './employees/employee.model';
// import { Company } from './company/company.model';
// import { Image } from './image/image.model';
// import { EmployeeService } from './employees/employee.service';
// import { CompanyService } from './company/company.service';
// import { ImageService } from './image/image.service';
// import { EmployeeController } from './employees/employee.controller';
// import { CompanyController } from './company/company.controller';
// import { ImageController } from './image/image.controller';

// @Module({
//   imports: [
//     SequelizeModule.forRoot({
//       dialect: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'root',
//       database: 'emp_DB',
//       models: [Employee, Company, Image],  // Add all models here for global scope
//       synchronize: true,   // Should only be true in development environments
//       logging: false,      // Disable logging for production (optional)
//     }),
//     EmployeeModule,  // Import EmployeeModule
//     CompanyModule,   // Import CompanyModule
//     ImageModule,     // Import ImageModule
//   ],
//   providers: [EmployeeService,CompanyService,ImageService],
//   controllers: [EmployeeController,CompanyController,ImageController],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeModule } from './employees/employee.module';
import { CompanyModule } from './company/company.module';
import { ImageModule } from './image/image.module';
import { Employee } from './employees/employee.model';
import { Company } from './company/company.model';
import { Image } from './image/image.model';
import { MailSend } from './email/mail-send.model';
import { MailModule } from './email/mail-send.module';
import { DepartmentModule } from './department/department.module';
import { Department } from './department/department.model';
import { UserToken } from './employees/user-token.model';

import { SalarySlip } from './Salary/salary-slip.model';
import { PayrollLog } from './payroll/payroll-log.model';
import {  PayrollModule } from './payroll/payroll.module';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/payment.model';
import { PayrollAdjustment } from './payroll_adjustments/payroll_adjustments.model';
import { PayrollAdjustmentsModule } from './payroll_adjustments/payroll_adjustments.module';
import { CheckInModule } from './check_ins/check-ins.module';
import { CheckIn } from './check_ins/check-ins.model';
import { AttendanceModule } from './attendance/attendance.module';
import { Attendance } from './attendance/attendance.model';
import { Leave } from './leaves/leave.model';
import { LeaveModule } from './leaves/leave.module';
import { HolidayModule } from './holiday/holiday.module';
import { ShiftModule } from './shift/shift.module';
import { Holiday } from './holiday/holiday.model';
import { Shift } from './shift/shift.model';





@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'emp_DB',
      models: [Employee, Company, Image,MailSend,Department,UserToken,SalarySlip,PayrollLog,Payment,PayrollAdjustment,CheckIn,Attendance,Leave,Holiday,Shift],  // Include all your models here
      synchronize: true,   // Enable only in development
      logging: false,      // Disable logging for production
    }),
    EmployeeModule,  // Make sure EmployeeModule is imported
    CompanyModule,   // Import other modules
    ImageModule,
    MailModule,
    DepartmentModule,
    PaymentModule,
    PayrollModule,
    PayrollAdjustmentsModule,
    CheckInModule,
    AttendanceModule,
    LeaveModule,
    HolidayModule,
    ShiftModule,
   
    
    
   
  ],
})
export class AppModule {}
