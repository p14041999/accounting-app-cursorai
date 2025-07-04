import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() body: CreateCompanyDto) {
    return this.companyService.create(body);
  }

  @Get()
  async listCompanies() {
    return this.companyService.findAll();
  }

  @Get(':id')
  async getCompanyById(@Param('id') id: string) {
    return this.companyService.findById(id);
  }

  @Put(':id')
  async updateCompany(@Param('id') id: string, @Body() body: UpdateCompanyDto) {
    return this.companyService.update(id, body);
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: string) {
    return this.companyService.delete(id);
  }
}
