// dto/create-leave.dto.ts
import { IsEnum, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export enum LeaveType {
  SICK = 'Sick Leave',
  PAID = 'Paid Leave',
  UNPAID = 'Unpaid Leave',
}

export class CreateLeaveDto {
  @IsNotEmpty()
  employee_id: number;

  @IsEnum(LeaveType)
  leave_type: LeaveType;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsString()
  reason: string;
}
