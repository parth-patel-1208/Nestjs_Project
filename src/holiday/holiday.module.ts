import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HolidayController } from './holiday.controller';
import { HolidayService } from './holiday.service';
import { Holiday } from './holiday.model';

@Module({
  imports: [SequelizeModule.forFeature([Holiday])],
  controllers: [HolidayController],
  providers: [HolidayService],
})
export class HolidayModule {}
