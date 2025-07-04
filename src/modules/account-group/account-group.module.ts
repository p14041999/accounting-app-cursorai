import { Module } from '@nestjs/common';
import { AccountGroupController } from './account-group.controller';
import { AccountGroupService } from './account-group.service';

@Module({
  controllers: [AccountGroupController],
  providers: [AccountGroupService],
})
export class AccountGroupModule {}
