import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Delete,
  Res,
  BadRequestException,
  Put,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Patch,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Response } from 'express';
import { Employee, EmployeeStatus } from './employee.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}


  @Get('test-db')
  async testDatabaseConnection() {
    return this.employeeService.testSequelizeConnection();
  }

  // Endpoint to generate random employee data
  @Post('generate-random')
  async generateRandomEmployeeData(): Promise<string> {
    // Update return type to Promise<string>
    // Call the service to generate random employee data
    await this.employeeService.generateRandomData();

    // Return a success message
    return 'Data successfully generated';
  }
  // eexcel file to database
  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join('./src/employees', 'public', 'exports');
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async importFromExcel(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required.');
    }

    const filePath = file.path;
    const result = await this.employeeService.importFromExcel(filePath);
    return { message: result };
  }

  // Endpoint to export employee data to Excel
  @Get('export')
  async exportToExcel(
    @Res() response: Response,
    @Query('search') search: string,
  ): Promise<void> {
    await this.employeeService.exportToExcel(response, search);
  }

  // Endpoint to search employees with pagination
  @Get('search')
  async search(
    @Query() filters: any,
  ): Promise<{ data: Employee[]; meta: any }> {
    return await this.employeeService.search(filters);
  }

  // Endpoint to create a new employee
  @Post()
  async create(@Body() employeeData: Partial<Employee>): Promise<Employee> {
    return await this.employeeService.create(employeeData);
  }

  // Endpoint to update an existing employee by ID
  @Put(':id/update')
  async updateEmployeeById(
    @Param('id') id: number,
    @Body() updateData: Partial<Employee>,
  ): Promise<Employee> {
    return await this.employeeService.updateEmployeeById(id, updateData);
  }

  // Endpoint to delete an employee by ID
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.employeeService.delete(id);
  }

  // Endpoint to get a list of unique random employees
  @Get('random/:count')
  async getUniqueRandomEmployees(
    @Param('count') count: number,
  ): Promise<Employee[]> {
    if (isNaN(count) || count <= 0) {
      throw new BadRequestException('Count must be a positive number');
    }
    return await this.employeeService.getUniqueRandomEmployees(count);
  }
  // @Post(':id/assign-random')
  // async assignRandomCompanyAndImage(
  //   @Param('id') employeeId: number,
  // ): Promise<Employee> {
  //   return this.employeeService.assignRandomCompanyAndImage(employeeId);
  // }

  @Post(':id/assign-random')
  async assignRandomCompany(@Param('id') employeeId: number): Promise<Employee> {
    return this.employeeService.assignRandomCompany(employeeId);
  }

  // // Assign a random company and image to every employee
  // @Post('assign-random-to-all')
  // async assignRandomCompanyAndImageToAll(): Promise<Employee[]> {
  //   return this.employeeService.assignRandomCompanyAndImageToAllEmployees();
  // }


  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.employeeService.register({ name, email, password });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.employeeService.login(email, password);
  }
  // @Get('decode-token/:token')
  // async getDecodedToken(@Param('token') token: string) {
  //   return this.employeeService.getDecodedToken(token);
  // }

  //update status
  @Patch(':id/status')
  async updateEmployeeStatus(@Param('id') id: number, @Body('status') status: EmployeeStatus) {
    return this.employeeService.updateEmployeeStatus(id, status);
  }

  //upload file
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
    }),
  }))
  uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body('fileType') fileType: string,
  ) {
    return this.employeeService.uploadEmployeeDocument(id, file, fileType);
  }

    // Get all employees for a specific company
    @Get('company/:companyId')
    async getEmployeesByCompany(@Param('companyId') companyId: number) {
      return this.employeeService.getEmployeesByCompany(companyId);
    }
  
    // Get total employee count for a specific company
    @Get('company/:companyId/count')
    async getTotalEmployeesByCompany(@Param('companyId') companyId: number) {
      return { totalEmployees: await this.employeeService.getTotalEmployeesByCompany(companyId) };
    }

  //   @Post('generate-salary-slip')
  // async generateSalarySlip(
  //   @Body('employeeId') employeeId: number,
  //   @Body('month') month: string,
  //   @Body('basicSalary') basicSalary: number,
  // ) {
  //   return this.employeeService.generateSalarySlip(employeeId, month, basicSalary);
  // }



  @Post('generate-salary-slip')
  async generateSalarySlip(
    @Body('employeeId') employeeId: number,
    @Body('month') month: string,
    @Body('basicSalary') basicSalary: number,
  ) {
    if (!employeeId || !month || !basicSalary) {
      throw new NotFoundException('Missing required fields');
    }

    return this.employeeService.generateSalarySlip(employeeId, month, basicSalary);
  }
    @Get('salary-slip/employee/:employeeId')
    async getSalarySlipsByEmployee(@Param('employeeId') employeeId: number) {
      return await this.employeeService.getSalarySlipsByEmployee(employeeId);
    }
  
    @Get('salary-slip/:id')
    async getSalarySlipById(@Param('id') id: number) {
      return await this.employeeService.getSalarySlipById(id);
    }
}
