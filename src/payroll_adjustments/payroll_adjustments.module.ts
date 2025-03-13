import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PayrollAdjustment } from './payroll_adjustments.model';
import { PayrollAdjustmentsService } from './payroll_adjustments.service';
import { PayrollAdjustmentsController } from './payroll_adjustments.controller';

@Module({
  imports: [SequelizeModule.forFeature([PayrollAdjustment])],
  controllers: [PayrollAdjustmentsController],
  providers: [PayrollAdjustmentsService],
})
export class PayrollAdjustmentsModule {}
