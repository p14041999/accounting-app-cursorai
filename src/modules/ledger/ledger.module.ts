import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ledger, LedgerSchema } from '../../schemas/ledger.schema';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import { VoucherModule } from '../voucher/voucher.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ledger.name, schema: LedgerSchema }]),
    forwardRef(() => VoucherModule),
  ],
  controllers: [LedgerController],
  providers: [LedgerService],
  exports: [LedgerService],
})
export class LedgerModule {}
