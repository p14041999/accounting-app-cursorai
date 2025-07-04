import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from '../../schemas/item.schema';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TaxCodeModule } from '../tax-code/tax-code.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    forwardRef(() => TaxCodeModule),
  ],
  providers: [ItemService],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {} 