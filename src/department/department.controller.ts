// department.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from './department.model';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() data: Partial<Department>) {
    return this.departmentService.create(data);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Department>) {
    return this.departmentService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(Number(id));
  }


  @Get(':id/summary')
  async getDepartmentSummary(@Param('id') id: number) {
    return this.departmentService.getDepartmentSummary(id);
  }

  @Get(':id')
async findOne(@Param('id') id: number) {
  return this.departmentService.findOne(id);
}

@Get()
async getAllDepartments() {
  return this.departmentService.getAllDepartments();
}

@Get(':id/employee-count')
async getEmployeeCount(@Param('id') id: number) {
  return this.departmentService.getEmployeeCountByDepartment(id);
}

@Put('/update-employee-counts')
  async updateAllEmployeeCounts() {
    return this.departmentService.updateAllDepartmentsEmployeeCount();
  }

 // Get all departments for a specific company
 @Get('company/:companyId')
 async getDepartmentsByCompany(@Param('companyId') companyId: number) {
   return this.departmentService.getDepartmentsByCompany(companyId);
 }
}
