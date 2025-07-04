import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountGroup, AccountGroupSchema } from '../../schemas/account-group.schema';
import { AccountGroupController } from './account-group.controller';
import { AccountGroupService } from './account-group.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: AccountGroup.name, schema: AccountGroupSchema }])],
  controllers: [AccountGroupController],
  providers: [AccountGroupService],
  exports: [AccountGroupService],
})
export class AccountGroupModule {}
