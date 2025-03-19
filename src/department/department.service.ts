// department.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './department.model';
import { Employee } from '../employees/employee.model';

@Injectable()
export class DepartmentService {
  create(data: Partial<Department>) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Department)
    private departmentModel: typeof Department,

    @InjectModel(Employee) // ✅ Inject Employee model
    private readonly employeeModel: typeof Employee,
  ) {}

  // async createDepartment(name: string, designation: string): Promise<Department> {
  //   const department = await this.departmentModel.create({
  //     name,
  //     designation,
  //   });
  //   return department;
  // }

  // async create(data: Partial<Department>): Promise<Department> {
  //   try {
  //     if ('id' in data) {
  //       delete data.id; // Remove `id` if it's manually passed
  //     }
  //     return await this.departmentModel.create(data);
  //   } catch (error) {
  //     console.error('Sequelize Validation Error:', error.errors);
  //     throw new BadRequestException(error.message);
  //   }
  // }

  async createDepartment(name: string, designation: string): Promise<Department> {
    try {
      const newDepartment = await this.departmentModel.create({ name, designation });
      return newDepartment;
    } catch (error) {
      console.error('Sequelize Validation Error:', error);
      if (error instanceof Error) {
        // If the error is an instance of an Error, log more details
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      // For validation error, Sequelize often includes the error details inside error.errors array
      if (error.errors) {
        console.error('Validation Errors:', error.errors);
      }
      throw new Error(`Error while creating department: ${error.message}`);
    }
  }
  
  

  // async findAll() {
  //   return this.departmentModel.findAll({ include: [Employee] });
  // }
  async findAll() {
    return this.departmentModel.findAll({
      include: [
        {
          model: Employee,
          as: 'employees',
          limit: 10, // Limit to 10 employees per department
          // offset: 0, // Can be used to paginate employees (e.g., page 1)
        },
      ],
      limit: 100, // Limit to 100 departments
    });
  }
  

  // async findOne(id: number) {
  //   return this.departmentModel.findByPk(id, { include: [Employee] });
  // }

  async update(id: number, data: Partial<Department>) {
    await this.departmentModel.update(data, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number) {
    const department = await this.findOne(id);
    if (department) {
      await department.destroy();
    }
    return department;
  }

  async getDepartmentSummary(id: number) {
    const department = await this.departmentModel.findOne({
        where: { id },
        include: [
            { model: Employee, as: 'employees' },        // Employee list in department
            { model: Employee, as: 'departmenthead' }   // Department head (explicit alias)
        ],
    });

    if (!department) {
        return { message: 'Department not found' };
    }

    return {
        departmentName: department.name,
        departmenthead: department.departmenthead ? department.departmenthead.name : 'No Head Assigned',
        employeeCount: department.employees.length,
    };
}

async findOne(id: number) {
  return this.departmentModel.findOne({
    where: { id },
    include: [
      { model: Employee, as: 'employees' }, // Regular employees
      { model: Employee, as: 'departmenthead' }, // Department head
    ],
  });
}



async getAllDepartments() {
  return this.departmentModel.findAll({
    attributes: [
      'id',
      'name',
      'departmentHead',
      [
        this.employeeModel.sequelize.literal(
          '(SELECT COUNT(*) FROM employees WHERE employees.department_id = department.id)',
        ),
        'employee_count',
      ],
    ],
  });
}

async getEmployeeCountByDepartment(departmentId: number) {
  const count = await this.employeeModel.count({
    where: { departmentid: departmentId },
  });

  // Update the employee count in the department table
  await this.departmentModel.update(
    { employee_count: count },
    { where: { id: departmentId } },
  );

  return { departmentId, employee_count: count };
}

async getAllDepartmentsWithEmployeeCount() {
  return this.departmentModel.findAll({
    attributes: ['id', 'name', 'employee_count'],
  });
}

async updateAllDepartmentsEmployeeCount() {
  const departments = await this.departmentModel.findAll();

  for (const department of departments) {
    const count = await this.employeeModel.count({
      where: { departmentid: department.id },
    });

    await this.departmentModel.update(
      { employee_count: count },
      { where: { id: department.id } },
    );
  }

  return { message: "All department employee counts updated successfully." };
}

  // Get all departments for a specific company
  async getDepartmentsByCompany(companyId: number) {
    return await this.departmentModel.findAll({
      where: { companyid: companyId },
    });
  }
  
  }
  

