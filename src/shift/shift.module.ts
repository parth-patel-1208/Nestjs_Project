import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';
import { Shift } from './shift.model';
import { Employee } from '../employees/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([Shift, Employee])],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
