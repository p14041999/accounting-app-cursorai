import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { CreateLedgerDto } from './dto/create-ledger.dto';
import { UpdateLedgerDto } from './dto/update-ledger.dto';

@Controller('ledgers')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Post()
  createLedger(@Body() body: CreateLedgerDto) {
    // TODO: Implement create ledger
  }

  @Get()
  listLedgers() {
    // TODO: Implement list ledgers
  }

  @Get(':id')
  getLedgerById(@Param('id') id: string) {
    // TODO: Implement get ledger by id
  }

  @Put(':id')
  updateLedger(@Param('id') id: string, @Body() body: UpdateLedgerDto) {
    // TODO: Implement update ledger
  }

  @Delete(':id')
  deleteLedger(@Param('id') id: string) {
    // TODO: Implement delete ledger
  }
}
