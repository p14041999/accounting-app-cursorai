import { Controller, Post, Body, Get, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TaxCodeService } from './tax-code.service';
import { CreateTaxCodeDto } from './dto/create-tax-code.dto';
import { UpdateTaxCodeDto } from './dto/update-tax-code.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Tax Codes')
@ApiBearerAuth()
@Controller('tax-codes')
@UseGuards(AuthGuard('jwt'))
export class TaxCodeController {
  constructor(private readonly taxCodeService: TaxCodeService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Create a new tax code (HSN/SAC)' })
  @ApiResponse({ status: 201, description: 'Tax code created' })
  create(@Body() dto: CreateTaxCodeDto) {
    return this.taxCodeService.create(dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT', 'STOCK_MANAGER')
  @ApiOperation({ summary: 'List all tax codes' })
  @ApiQuery({ name: 'company', required: false })
  findAll(@Query('company') company?: string) {
    return this.taxCodeService.findAll(company ? { company } : {});
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT', 'STOCK_MANAGER')
  @ApiOperation({ summary: 'Get a tax code by ID' })
  findById(@Param('id') id: string) {
    return this.taxCodeService.findById(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Update a tax code' })
  update(@Param('id') id: string, @Body() dto: UpdateTaxCodeDto) {
    return this.taxCodeService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a tax code' })
  remove(@Param('id') id: string) {
    return this.taxCodeService.delete(id);
  }
} 