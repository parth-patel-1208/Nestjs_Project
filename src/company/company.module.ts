import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './company.model';
import { CompanyService } from '../company/company.service';
import { CompanyController } from './company.controller';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  providers: [CompanyService],
  controllers:[CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
