import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Voucher, VoucherSchema } from '../../schemas/voucher.schema';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { LedgerModule } from '../ledger/ledger.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Voucher.name, schema: VoucherSchema }]),
    forwardRef(() => LedgerModule),
  ],
  controllers: [VoucherController],
  providers: [VoucherService],
  exports: [VoucherService],
})
export class VoucherModule {}
