// shift.controller.ts
import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ShiftService } from './shift.service';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post('assign')
  async assignShift(@Body() body: { employeeId: number; shiftType: string; shiftDate: string }) {
    return this.shiftService.assignShift(body.employeeId, body.shiftType, body.shiftDate);
  }

  @Get('employee/:id')
  async getEmployeeShifts(@Param('id') id: number) {
    return this.shiftService.getEmployeeShifts(id);
  }

  @Get()
  async getAllShifts() {
    return this.shiftService.getAllShifts();
  }

  @Put('update-status/:shiftId')
  async updateShiftStatus(@Param('shiftId') shiftId: number, @Body('status') status: string) {
    return this.shiftService.updateShiftStatus(shiftId, status);
  }
}
