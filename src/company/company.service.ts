import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './company.model';
import { Employee } from 'src/employees/employee.model';
import { Op } from 'sequelize';
import { Department } from 'src/department/department.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private readonly companyModel: typeof Company,
  ) {}

  // Create a new company
  async create(companyData: Partial<Company>): Promise<Company> {
    return this.companyModel.create(companyData);
  }

  // Get all companies
  async findAll(): Promise<Company[]> {
    return this.companyModel.findAll();
  }

  // Get a company by ID
  //   async findOne(id: number): Promise<Company> {
  //     const company = await this.companyModel.findByPk(id);
  //     if (!company) {
  //       throw new NotFoundException('Company not found');
  //     }
  //     return company;
  //   }

  // async findCompanyWithEmployees(companyId: number) {
  //     try {
  //       const company = await this.companyModel.findOne({
  //         where: {
  //           id: companyId,
  //         },
  //         include: [
  //           {
  //             model: Employee,
  //             attributes: ['id', 'name', 'email', 'phoneNumber', 'startDate', 'endDate'], // Include employee info
  //           },
  //         ],
  //       });

  //       if (!company) {
  //         throw new Error('Company not found');
  //       }

  //       return company;
  //     } catch (error) {
  //       console.error('Error fetching company with employees: ', error);
  //       throw new Error('Unable to fetch company data');
  //     }
  //   }

  // Update a company by ID
  async update(id: number, updateData: Partial<Company>): Promise<Company> {
    const company = await this.companyModel.findByPk(id);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company.update(updateData);
  }

  // Delete a company by ID
  async delete(id: number): Promise<void> {
    const company = await this.companyModel.findByPk(id);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    await company.destroy();
  }

  async searchCompanies(filters: any): Promise<Company[]> {
    const { search, page = 1, limit = 10 } = filters;

    const queryOptions: any = {
      where: {},
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: Employee,
          attributes: [
            'id',
            'name',
            'email',
            'phoneNumber',
            'startDate',
            'endDate',
          ], // Include employee info
        },
        {
          model: Department,
          attributes: ['name'],
        },
      ],
    };

    if (search) {
      // Check if search is a number (for id search)
      const isId = /^\d+$/.test(search);
      const isLocation = /^[a-zA-Z0-9\s,]*$/.test(search); // Allow alphanumeric and space characters for location

      if (isId) {
        queryOptions.where['id'] = Number(search); // Search by id
      } else if (isLocation) {
        queryOptions.where['location'] = { [Op.iLike]: `%${search}%` }; // Search by location (case-insensitive)
      } else {
        // Search by name (partial match)
        queryOptions.where['name'] = { [Op.iLike]: `%${search}%` }; // Case-insensitive search for name
      }
    }

    const companies = await this.companyModel.findAll(queryOptions);
    return companies;
  }
}
