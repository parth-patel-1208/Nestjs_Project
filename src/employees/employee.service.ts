import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee, EmployeeStatus } from './employee.model';
import { Company } from '../company/company.model';
import { Image } from '../image/image.model';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs';
import { faker } from '@faker-js/faker';
 import { Op } from 'sequelize';
import * as moment from 'moment';
import { MailSend } from 'src/email/mail-send.model';
import { Department } from 'src/department/department.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './user-token.model';
import * as jwt from 'jsonwebtoken';
import { SalarySlip } from 'src/Salary/salary-slip.model';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';


@Injectable()
export class EmployeeService {
  getEmployeeById: any;
  constructor(
    // private readonly sequelize: Sequelize,
    @InjectModel(Employee) private readonly employeeModel: typeof Employee,
    @InjectModel(Company) private readonly companyModel: typeof Company,
    @InjectModel(Department)
    private readonly departmentModel: typeof Department,
    @InjectModel(Image) private readonly imageModel: typeof Image,
    @InjectModel(UserToken) private userTokenModel: typeof UserToken,
    @InjectModel(SalarySlip)
    private readonly salarySlipModel: typeof SalarySlip, // Use correct naming
    private readonly jwtService: JwtService,
    private readonly sequelize: Sequelize
  ) {}


  async testSequelizeConnection() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Database connection successful');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
    }
  }

  async generateRandomData(): Promise<void> {
    const startTime = Date.now();
    const data = [];

    let companies = await this.companyModel.findAll();
    let departments = await this.departmentModel.findAll();

    if (companies.length === 0) {
      console.log('No companies found. Creating random companies...');
      for (let i = 0; i < 1000; i++) {
        try {
          const newCompany = await this.companyModel.create({
            name: faker.company.name(),
            location: faker.location.city(),
          });
          companies.push(newCompany);
        } catch (error) {
          console.error(
            `Error creating company at index ${i}: `,
            error.message,
          );
        }
      }
      console.log(`${companies.length} companies created.`);
    }

    if (departments.length < 50) {
      console.log(
        'Insufficient departments found. Creating random departments...',
      );
      for (let i = departments.length; i < 50; i++) {
        // Ensuring 50 departments
        try {
          const newDepartment = await this.departmentModel.create({
            name: faker.commerce.department(),
            companyid:
              companies[Math.floor(Math.random() * companies.length)].id, // Assign companyId to department
          });
          departments.push(newDepartment);
        } catch (error) {
          console.error(
            `Error creating department at index ${i}: `,
            error.message,
          );
        }
      }
      console.log(`Total ${departments.length} departments created.`);
    }

    for (let i = 0; i < 1000; i++) {
      const randomCompany =
        companies[Math.floor(Math.random() * companies.length)];

      // Now assigning departmentId randomly between 1 and 50
      const randomDepartmentId = Math.floor(Math.random() * 50) + 1; // Department ID between 1 and 50

      data.push({
        name: faker.person.fullName(),
        city: faker.location.city(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phoneNumber: faker.phone.number(),
        startDate: faker.date.past({ years: 1 }),
        endDate: faker.date.future({ years: 1 }),
        companyId: randomCompany.id,
        departmentId: randomDepartmentId, // Random departmentId between 1 and 50
      });

      if (data.length >= 1000) {
        try {
          await Employee.bulkCreate(data, { validate: true });
          data.length = 0;
          console.log('Bulk created 1000 employees');
        } catch (error) {
          console.error('Error during bulk creation of employees: ', error);
        }
      }
    }

    if (data.length > 0) {
      try {
        await Employee.bulkCreate(data, { validate: true });
        console.log('Final bulk create for remaining employees');
      } catch (error) {
        console.error('Error during final bulk creation of employees: ', error);
      }
    }

    const endTime = Date.now();
    const executionTime = endTime - startTime;

    console.log(
      `Data generation started at: ${new Date(startTime).toLocaleString()}`,
    );
    console.log(
      `Data generation ended at: ${new Date(endTime).toLocaleString()}`,
    );
    console.log(`Total execution time: ${executionTime} ms`);
  }

  // Import employee data from Excel file
  async importFromExcel(filePath: string): Promise<string> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);

    if (!worksheet) {
      throw new BadRequestException('Invalid Excel file.');
    }

    const employees: Partial<Employee>[] = [];

    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex === 1) return;

      const [
        id,
        name,
        city,
        email,
        phoneNumber,
        startDate,
        endDate,
        hiredDate,
      ] = row.values as any[];

      if (
        !name ||
        !city ||
        !email ||
        !phoneNumber ||
        !startDate ||
        !hiredDate
      ) {
        throw new BadRequestException(
          `Missing required fields at row ${rowIndex}`,
        );
      }

      employees.push({
        name,
        city,
        email,
        phoneNumber,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        hiredDate: new Date(hiredDate),
      });
    });

    await this.employeeModel.bulkCreate(employees, { validate: true });
    fs.unlinkSync(filePath);

    return 'Data imported successfully!';
  }

  // Export employee data to Excel file
  async exportToExcel(response: Response, search?: string): Promise<void> {
    const employees = search
      ? await this.employeeModel.findAll({
          where: { name: { [Op.iLike]: `%${search}%` } },
        })
      : await this.employeeModel.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'City', key: 'city', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone Number', key: 'phone', width: 20 },
      { header: 'Start Date', key: 'startDate', width: 20 },
    ];

    employees.forEach((employee) => {
      worksheet.addRow(employee.toJSON());
    });

    const directoryPath = path.join('./src/employees', 'public', 'exports');
    const filePath = path.resolve(
      directoryPath,
      `employees_${search || 'all'}.xlsx`,
    );

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    await workbook.xlsx.writeFile(filePath);

    response.setHeader(
      'Content-Disposition',
      `attachment; filename=employees_${search || 'all'}.xlsx`,
    );
    response.sendFile(filePath);
  }

  // Search employees with filters
  async search(filters: any): Promise<{ data: Employee[]; meta: any }> {
    const { search, page = 1, limit = 10 } = filters;

    const queryOptions: any = {
      where: {},
      limit,
      offset: (page - 1) * limit,
      //new

      include: [
        {
          model: Company, // Include the related Company model
          attributes: ['name', 'location'], // Select the fields you want from the Company model
        },
        {
          model: MailSend,
          attributes: ['email', 'otp', 'employeeId'],
          required: false, // Prevents errors if no MailSend exists
        },
        {
          model: Department,
          attributes: ['name'],
        },
      ],
    };

    if (search) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneRegex = /^\d+$/;
      const isDate = moment(search, 'YYYY-MM-DD', true).isValid();
      const isId = /^\d+$/.test(search);

      if (emailRegex.test(search)) {
        queryOptions.where['email'] = { [Op.iLike]: `%${search}%` };
      } else if (phoneRegex.test(search)) {
        queryOptions.where['phoneNumber'] = { [Op.like]: `%${search}%` };
      } else if (isDate) {
        queryOptions.where['startDate'] = search;
      } else if (search.startsWith('end-')) {
        const endDate = search.slice(4);
        const parsedDate = moment(endDate, 'YYYY-MM-DD', true).isValid()
          ? endDate
          : null;

        if (parsedDate) {
          queryOptions.where['endDate'] = parsedDate;
        } else {
          throw new BadRequestException('Invalid end date format.');
        }
      } else if (search.startsWith('id-')) {
        const idValue = search.slice(3);
        const numericId = Number(idValue);

        if (!isNaN(numericId)) {
          queryOptions.where['id'] = numericId;
        } else {
          throw new BadRequestException('Invalid ID value.');
        }
      } else if (/^[a-zA-Z0-9@.\s]*$/.test(search)) {
        queryOptions.where[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { city: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ];
      } else {
        throw new BadRequestException('Invalid search query.');
      }
    }

    const { rows: data, count: total } =
      await Employee.findAndCountAll(queryOptions);

    return {
      data,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  // Create employee
  async create(employeeData: Partial<Employee>): Promise<Employee> {
    return this.employeeModel.create(employeeData);
  }

  // Update employee by ID
  async updateEmployeeById(
    id: number,
    updateData: Partial<Employee>,
  ): Promise<Employee> {
    const employee = await this.employeeModel.findByPk(id);
    if (!employee) throw new NotFoundException('Employee not found.');
    return employee.update(updateData);
  }

  // Delete employee by ID
  async delete(id: number): Promise<void> {
    const employee = await this.employeeModel.findByPk(id);
    if (!employee) throw new NotFoundException('Employee not found.');
    await employee.destroy();
  }

  // // Assign a random company and image to a specific employee
  // async assignRandomCompanyAndImage(employeeId: number): Promise<Employee> {
  //   const companies = await this.companyModel.findAll();
  //   const images = await this.imageModel.findAll();

  //   if (!companies.length || !images.length) {
  //     throw new Error('No companies or images found.');
  //   }

  //   const randomCompany =
  //     companies[Math.floor(Math.random() * companies.length)];
  //   const randomImage = images[Math.floor(Math.random() * images.length)];

  //   const employee = await this.employeeModel.findByPk(employeeId);
  //   if (employee) {
  //     employee.companyId = randomCompany.id;
  //     // employee.imageId = randomImage.id;
  //     await employee.save();
  //   }

  //   return employee;
  // }

  async assignRandomCompany(employeeId: number): Promise<Employee> {
    // Fetch all companies
    const companies = await this.companyModel.findAll();
  
    // Check if companies exist
    if (!companies.length) {
      throw new Error('No companies found.');
    }
  
    // Pick a random company
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
  
    // Find employee
    const employee = await this.employeeModel.findByPk(employeeId);
    if (!employee) {
      throw new Error(`Employee with ID ${employeeId} not found.`);
    }
  
    // Assign only company
    employee.companyId = randomCompany.id;
    await employee.save();
  
    return employee;
  }
  

  // // Assign a random company and image to every employee
  // async assignRandomCompanyAndImageToAllEmployees(): Promise<Employee[]> {
  //   const companies = await this.companyModel.findAll();
  //   const images = await this.imageModel.findAll();

  //   if (!companies.length || !images.length) {
  //     throw new Error('No companies or images found.');
  //   }

  //   const employees = await this.employeeModel.findAll();

  //   for (const employee of employees) {
  //     const randomCompany =
  //       companies[Math.floor(Math.random() * companies.length)];
  //     // const randomImage = images[Math.floor(Math.random() * images.length)];

  //     employee.companyId = randomCompany.id;
  //     // employee.imageId = randomImage.id;
  //     await employee.save();
  //   }

  //   return employees;
  // }

  // Get random unique employees
  async getUniqueRandomEmployees(count: number): Promise<Employee[]> {
    const employees = await this.employeeModel.findAll();
    const shuffled = employees.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Employee Registration
  async register(
    employeeData: Partial<Employee>,
  ): Promise<{ message: string }> {
    const { email, password } = employeeData;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const existingEmployee = await this.employeeModel.findOne({
      where: { email },
    });
    if (existingEmployee) {
      throw new BadRequestException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.employeeModel.create({
      ...employeeData,
      password: hashedPassword,
    });

    return { message: 'Employee registered successfully' };
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    // Find employee by email
    const employee = await this.employeeModel.findOne({ where: { email } });

    // If employee does not exist or password doesn't match
    if (!employee || !(await bcrypt.compare(password, employee.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and return JWT token
    const token = this.jwtService.sign({
      id: employee.id,
      email: employee.email,
    });
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expiration time (1 hour in this case)

    await this.userTokenModel.create({
      employeeId: employee.id, // Reference the employee
      token, // Store the generated JWT token
      expiresAt, // Store the expiration date
    });

    return { token }; // Return the token in response
  }

  async getToken(employeeId: number): Promise<string | null> {
    const userToken = await this.userTokenModel.findOne({
      where: { employeeId },
      order: [['createdAt', 'DESC']], // Get the most recent token
    });

    if (userToken && userToken.expiresAt > new Date()) {
      return userToken.token;
    } else {
      return null; // Token has expired or does not exist
    }
  }

  //update status by id
  async updateEmployeeStatus(id: number, status: EmployeeStatus) {
    await this.employeeModel.update({ status }, { where: { id } });
    return this.getEmployeeById(id);
  }

  //file upload
  async uploadEmployeeDocument(
    id: number,
    file: Express.Multer.File,
    fileType: string,
  ) {
    const filePath = `uploads/${file.filename}`;

    // Update employee record with file details
    await this.employeeModel.update(
      {
        file_name: file.originalname,
        file_type: fileType,
        file_url: filePath,
      },
      { where: { id } },
    );

    return { message: 'File uploaded successfully', fileUrl: filePath };
  }

    // Get all employees for a specific company
    async getEmployeesByCompany(companyId: number) {
      return await this.employeeModel.findAll({
        where: { companyId: companyId },
      });
    }
  
    // Get total employee count for a specific company
    async getTotalEmployeesByCompany(companyId: number) {
      return await this.employeeModel.count({
        where: { companyId: companyId },
      });
    }
//     async generateSalarySlip(employeeId: number, month: string, basicSalary: number) {
//       const employee = await this.employeeModel.findByPk(employeeId);
//       if (!employee) {
//         throw new NotFoundException('Employee not found');
//       }
  
//       // Call the PostgreSQL function
//       const query = `SELECT * FROM calculate_tax_deductions(:basicSalary)`;
//       const [result] = await this.sequelize.query(query);
      
// // Ensure the result is treated as an array of objects
// const salaryData = (result as any[])[0]; 

// if (!salaryData) {
//   throw new Error("No salary data found.");
// }

// return {
//   tax_amount: salaryData.tax_amount,
//   pf_amount: salaryData.pf_amount,
//   professional_tax: salaryData.professional_tax,
//   total_deductions: salaryData.total_deductions,
//   net_salary: salaryData.net_salary,
// };
//     }


async generateSalarySlip(employeeId: number, month: string, basicSalary: number) {
  // Check if employee exists
  const employee = await this.employeeModel.findByPk(employeeId);
  if (!employee) {
    throw new NotFoundException('Employee not found');
  }

  // Call the PostgreSQL function correctly
  const query = `SELECT * FROM calculate_tax_deductions(:basicSalary)`;
  const [results] = await this.sequelize.query(query, {
    replacements: { basicSalary },
    type: QueryTypes.SELECT, // ✅ Ensure correct type
  });

  // ✅ Cast results to expected structure
  const salaryData = results as {
    tax_amount: number;
    pf_amount: number;
    professional_tax: number;
    total_deductions: number;
    net_salary: number;
  };

  // Ensure the result is properly extracted
  if (!salaryData) {
    throw new Error("No salary data found.");
  }

  return {
    employeeId,
    month,
    basicSalary,
    tax_amount: salaryData.tax_amount,
    pf_amount: salaryData.pf_amount,
    professional_tax: salaryData.professional_tax,
    total_deductions: salaryData.total_deductions,
    net_salary: salaryData.net_salary,
  };
}


  
  
    async getSalarySlipsByEmployee(employeeId: number) {
      return await this.salarySlipModel.findAll({
        where: { employee_id: employeeId },
        include: [Employee],
      });
    }
  
    async getSalarySlipById(id: number) {
      return await this.salarySlipModel.findByPk(id, {
        include: [Employee],
      });
    }

}
  

