import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxCode, TaxCodeSchema } from '../../schemas/tax-code.schema';
import { TaxCodeService } from './tax-code.service';
import { TaxCodeController } from './tax-code.controller';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaxCode.name, schema: TaxCodeSchema }]),
    forwardRef(() => ItemModule),
  ],
  controllers: [TaxCodeController],
  providers: [TaxCodeService],
  exports: [TaxCodeService],
})
export class TaxCodeModule {} 