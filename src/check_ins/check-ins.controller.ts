import { Controller, Post, Param, Get } from '@nestjs/common';
import { CheckInService } from './check-ins.service';

@Controller('check-ins')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post('check-in/:employeeId')
  async checkIn(@Param('employeeId') employeeId: number) {
    return this.checkInService.checkIn(employeeId);
  }

  @Post('check-out/:employeeId')
  async checkOut(@Param('employeeId') employeeId: number) {
    return this.checkInService.checkOut(employeeId);
  }

  @Get()
  async getCheckIns() {
    return this.checkInService.getCheckIns();
  }
}
