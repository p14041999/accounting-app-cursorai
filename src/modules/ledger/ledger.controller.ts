import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { CreateLedgerDto } from './dto/create-ledger.dto';
import { UpdateLedgerDto } from './dto/update-ledger.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Ledger')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('ledgers')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Create a new ledger' })
  @ApiBody({ type: CreateLedgerDto })
  @ApiResponse({ status: 201, description: 'The ledger has been successfully created.' })
  async createLedger(@Body() body: CreateLedgerDto) {
    return this.ledgerService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List all ledgers' })
  @ApiResponse({ status: 200, description: 'List of ledgers.' })
  async listLedgers(@Query() query: any) {
    return this.ledgerService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ledger by ID' })
  @ApiParam({ name: 'id', description: 'Ledger ID' })
  @ApiResponse({ status: 200, description: 'The ledger with the given ID.' })
  async getLedgerById(@Param('id') id: string) {
    return this.ledgerService.findById(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Update a ledger by ID' })
  @ApiParam({ name: 'id', description: 'Ledger ID' })
  @ApiBody({ type: UpdateLedgerDto })
  @ApiResponse({ status: 200, description: 'The updated ledger.' })
  async updateLedger(@Param('id') id: string, @Body() body: UpdateLedgerDto) {
    return this.ledgerService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Delete a ledger by ID' })
  @ApiParam({ name: 'id', description: 'Ledger ID' })
  @ApiResponse({ status: 200, description: 'The deleted ledger.' })
  async deleteLedger(@Param('id') id: string) {
    return this.ledgerService.delete(id);
  }
}
