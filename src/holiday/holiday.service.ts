// holiday.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Holiday } from './holiday.model';

@Injectable()
export class HolidayService {
  constructor(
    @InjectModel(Holiday)
    private holidayModel: typeof Holiday,
  ) {}

  async addHoliday(holidayName: string, holidayDate: string, holidayType: string) {
    const holiday = await this.holidayModel.create({
      holiday_name: holidayName,
      holiday_date: holidayDate,
      holiday_type: holidayType,
    });
    return holiday;
  }

  async getAllHolidays() {
    return this.holidayModel.findAll();
  }

  async deleteHoliday(id: number) {
    const holiday = await this.holidayModel.findByPk(id);
    if (!holiday) throw new Error('Holiday not found');
    await holiday.destroy();
    return { message: 'Holiday deleted successfully' };
  }
}
