// leave.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { Leave } from './leave.model';
import { Employee } from '../employees/employee.model';  // assuming Employee model exists

@Module({
  imports: [SequelizeModule.forFeature([Leave, Employee])],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
