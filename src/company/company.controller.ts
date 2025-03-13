import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Put,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.model';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // Create a new company
  @Post()
  async create(@Body() companyData: Partial<Company>): Promise<Company> {
    return this.companyService.create(companyData);
  }

  // Get all companies
  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  // Get a company by ID
  //   @Get(':id')
  //   async findOne(@Param('id') id: number): Promise<Company> {
  //     return this.companyService.findOne(id);
  //   }

  // @Get(':companyId')
  //   async getCompanyWithEmployees(@Param('companyId') companyId: number) {
  //     try {
  //       const company = await this.companyService.findCompanyWithEmployees(companyId);
  //       return {
  //         data: company,
  //       };
  //     } catch (error) {
  //       throw new NotFoundException('Company not found or unable to fetch data');
  //     }
  //   }

  // Update a company by ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Company>,
  ): Promise<Company> {
    return this.companyService.update(id, updateData);
  }

  // Delete a company by ID
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.companyService.delete(id);
  }

  @Get('search')
  async search(@Query() filters: any) {
    const companies = await this.companyService.searchCompanies(filters);
    return { data: companies };
  }
}
