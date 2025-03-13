// leave.controller.ts
import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './create-leave.dto';


@Controller('leaves')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post('request')
  async requestLeave(@Body() createLeaveDto: CreateLeaveDto) {
    return this.leaveService.createRequest(createLeaveDto);
  }

  @Post('approve/:id')
  async approveLeave(@Param('id') id: number, @Body() approvalData: { status: string }) {
    return this.leaveService.approveLeave(id, approvalData.status);
  }
}
