// // src/employees/employee.module.ts
// import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';  // Import SequelizeModule
// import { Employee } from './employee.model';  // Make sure you have your Sequelize model
// import { EmployeeService } from './employee.service';
// import { EmployeeController } from './employee.controller';
// import { CompanyModule } from '@faker-js/faker/.';

// @Module({
//   imports: [
//     SequelizeModule.forFeature([Employee]), // Register your Employee model with Sequelize
//     CompanyModule
//   ],
//   providers: [EmployeeService],
//   controllers: [EmployeeController],
//   // providers: [EmployeeService],
//   // controllers: [EmployeeController],
//   // exports: [EmployeeService],
// })
// export class EmployeeModule {}



import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './employee.model';
import { Company } from '../company/company.model';
import { Image } from '../image/image.model';
import { CompanyModule } from '../company/company.module';
import { Department } from 'src/department/department.model';
import { JwtModule } from '@nestjs/jwt';
import { UserToken } from './user-token.model';
import { SalarySlip } from 'src/Salary/salary-slip.model';
import { PayrollLog } from 'src/payroll/payroll-log.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Employee, Company, Image, Department,UserToken,SalarySlip,PayrollLog]),  // Register models
    CompanyModule,  // Import CompanyModule
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}




