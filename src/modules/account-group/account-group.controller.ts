import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AccountGroupService } from './account-group.service';
import { CreateAccountGroupDto } from './dto/create-account-group.dto';
import { UpdateAccountGroupDto } from './dto/update-account-group.dto';

@Controller()
export class AccountGroupController {
  constructor(private readonly accountGroupService: AccountGroupService) {}

  @Post('account-groups')
  createAccountGroup(@Body() body: CreateAccountGroupDto) {
    // TODO: Implement create account group
  }

  @Get('account-groups/tree')
  getFullChartOfAccountsTree() {
    // TODO: Implement get full chart of accounts tree
  }

  @Get('ledgers/by-group/:id')
  getLedgersUnderGroup(@Param('id') id: string) {
    // TODO: Implement get ledgers under group
  }
}
