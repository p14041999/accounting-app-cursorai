import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { AccountGroupService } from './account-group.service';
import { CreateAccountGroupDto } from './dto/create-account-group.dto';
import { UpdateAccountGroupDto } from './dto/update-account-group.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Account Groups')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('account-groups')
export class AccountGroupController {
  constructor(private readonly accountGroupService: AccountGroupService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Create a new account group' })
  @ApiBody({ type: CreateAccountGroupDto })
  @ApiResponse({ status: 201, description: 'The account group has been successfully created.' })
  async createAccountGroup(@Body() body: CreateAccountGroupDto) {
    return this.accountGroupService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List all account groups' })
  @ApiResponse({ status: 200, description: 'List of account groups.' })
  async listAccountGroups(@Query() query: any) {
    return this.accountGroupService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an account group by ID' })
  @ApiParam({ name: 'id', description: 'Account Group ID' })
  @ApiResponse({ status: 200, description: 'The account group with the given ID.' })
  async getAccountGroupById(@Param('id') id: string) {
    return this.accountGroupService.findById(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Update an account group by ID' })
  @ApiParam({ name: 'id', description: 'Account Group ID' })
  @ApiBody({ type: UpdateAccountGroupDto })
  @ApiResponse({ status: 200, description: 'The updated account group.' })
  async updateAccountGroup(@Param('id') id: string, @Body() body: UpdateAccountGroupDto) {
    return this.accountGroupService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Delete an account group by ID' })
  @ApiParam({ name: 'id', description: 'Account Group ID' })
  @ApiResponse({ status: 200, description: 'The deleted account group.' })
  async deleteAccountGroup(@Param('id') id: string) {
    return this.accountGroupService.delete(id);
  }

  @Get('tree')
  @ApiOperation({ summary: 'Get full chart of accounts tree' })
  @ApiResponse({ status: 200, description: 'Full chart of accounts tree.' })
  async getFullChartOfAccountsTree() {
    return this.accountGroupService.getFullChartOfAccountsTree();
  }

  @Get('ledgers/by-group/:id')
  @ApiOperation({ summary: 'Get ledgers under a group' })
  @ApiParam({ name: 'id', description: 'Account Group ID' })
  @ApiResponse({ status: 200, description: 'List of ledgers under the group.' })
  async getLedgersUnderGroup(@Param('id') id: string) {
    return this.accountGroupService.getLedgersUnderGroup(id);
  }
}
