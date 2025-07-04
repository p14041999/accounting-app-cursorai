import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  createVoucher(@Body() body: CreateVoucherDto) {
    // TODO: Implement create voucher
  }

  @Get()
  listVouchers() {
    // TODO: Implement list vouchers
  }

  @Get(':id')
  getVoucherById(@Param('id') id: string) {
    // TODO: Implement get voucher by id
  }
}
