// department.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './department.model';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { Company } from '../company/company.model';
import { Employee } from '../employees/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([Department, Company, Employee])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}