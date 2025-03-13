// leave.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Leave } from './leave.model';
import { CreateLeaveDto } from './create-leave.dto';
import { Employee } from '../employees/employee.model';  // Assuming Employee model exists

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(Leave)
    private leaveModel: typeof Leave,
    @InjectModel(Employee)
    private employeeModel: typeof Employee,
  ) {}

  
  async createRequest(createLeaveDto: CreateLeaveDto) {
    // Optionally check if employee exists
    const employee = await this.employeeModel.findByPk(createLeaveDto.employee_id);
    if (!employee) {
      throw new Error('Employee not found');
    }

    // Map DTO to the model fields
    const leaveRequestData = {
      employee_id: createLeaveDto.employee_id,
      leave_type: createLeaveDto.leave_type,
      start_date: createLeaveDto.start_date,
      end_date: createLeaveDto.end_date,
      reason: createLeaveDto.reason,
      status: 'Pending',  // Default to 'Pending' status
    };

    // Create leave request
    const leaveRequest = await this.leaveModel.create(leaveRequestData);
    return leaveRequest;
  }

  async approveLeave(leaveId: number, status: string) {
    const leaveRequest = await this.leaveModel.findByPk(leaveId);
    if (!leaveRequest) {
      throw new Error('Leave request not found');
    }

    // Update leave status and approved_by
    leaveRequest.status = status;
    leaveRequest.approved_by = 1;  // Replace with the ID of the admin/manager
    await leaveRequest.save();
    return leaveRequest;
  }
}
