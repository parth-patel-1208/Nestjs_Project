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

  // @Post()
  // create(@Body() data: { name: string; designation: string }) {
  //   return this.departmentService.createDepartment(data.name, data.designation);
  // }
  
  // @Post('create') // This will handle POST requests to /departments/create
  // async createDepartment(
  //   @Body() body: { name: string; designation: string }, // Expecting name and designation in the body
  // ): Promise<Department> {
  //   const { name, designation } = body;
  //   try {
  //     return await this.departmentService.createDepartment(name, designation);
  //   } catch (error) {
  //     throw new Error(`Failed to create department: ${error.message}`);
  //   }
  // }

  @Post('create') // POST request to create a new department
  async createDepartment(
    @Body() body: { name: string; designation: string }, // Request body with name and designation
  ): Promise<Department> {
    const { name, designation } = body;
    try {
      const department = await this.departmentService.createDepartment(name, designation);
      return department; // If successful, return the created department object
    } catch (error) {
      // If there is an error, throw it with a message
      throw new Error(`Failed to create department: ${error.message}`);
    }
  }

  // @Get()
  // findAll() 
  //   return this.departmentService.findAll();
  // }

  @Get()
  async findAll() {
    // Call the findAll method from the service
    const departments = await this.departmentService.findAll();
    
    // Return the result
    return { data: departments };
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
