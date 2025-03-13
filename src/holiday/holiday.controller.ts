// holiday.controller.ts
import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { HolidayService } from './holiday.service';

@Controller('holidays')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Post('add')
  async addHoliday(@Body() body: { holidayName: string; holidayDate: string; holidayType: string }) {
    return this.holidayService.addHoliday(body.holidayName, body.holidayDate, body.holidayType);
  }

  @Get()
  async getAllHolidays() {
    return this.holidayService.getAllHolidays();
  }

  @Delete(':id')
  async deleteHoliday(@Param('id') id: number) {
    return this.holidayService.deleteHoliday(id);
  }
}
