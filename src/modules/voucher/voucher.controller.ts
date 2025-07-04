import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Voucher')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Create a new voucher' })
  @ApiBody({ type: CreateVoucherDto })
  @ApiResponse({ status: 201, description: 'The voucher has been successfully created.' })
  async createVoucher(@Body() body: CreateVoucherDto) {
    return this.voucherService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List all vouchers' })
  @ApiResponse({ status: 200, description: 'List of vouchers.' })
  async listVouchers(@Query() query: any) {
    return this.voucherService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a voucher by ID' })
  @ApiParam({ name: 'id', description: 'Voucher ID' })
  @ApiResponse({ status: 200, description: 'The voucher with the given ID.' })
  async getVoucherById(@Param('id') id: string) {
    return this.voucherService.findById(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Update a voucher by ID' })
  @ApiParam({ name: 'id', description: 'Voucher ID' })
  @ApiBody({ type: UpdateVoucherDto })
  @ApiResponse({ status: 200, description: 'The updated voucher.' })
  async updateVoucher(@Param('id') id: string, @Body() body: UpdateVoucherDto) {
    return this.voucherService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Delete a voucher by ID' })
  @ApiParam({ name: 'id', description: 'Voucher ID' })
  @ApiResponse({ status: 200, description: 'The deleted voucher.' })
  async deleteVoucher(@Param('id') id: string) {
    return this.voucherService.delete(id);
  }
}
