import { Injectable, NotFoundException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from '../../schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { TaxCodeService } from '../tax-code/tax-code.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @Inject(forwardRef(() => TaxCodeService)) private taxCodeService: TaxCodeService,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    if (createItemDto.code) {
      const exists = await this.itemModel.findOne({ code: createItemDto.code });
      if (exists) throw new ConflictException('Item code must be unique');
    }
    if (createItemDto.hsnCode) {
      const taxCode = await this.taxCodeService.findById(createItemDto.hsnCode).catch(() => null);
      if (!taxCode) throw new NotFoundException('HSN/TaxCode not found');
    }
    const created = new this.itemModel(createItemDto);
    return created.save();
  }

  async findAll(filter: any = {}): Promise<Item[]> {
    return this.itemModel.find(filter).exec();
  }

  async findById(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    if (updateItemDto.code) {
      const exists = await this.itemModel.findOne({ code: updateItemDto.code, _id: { $ne: id } });
      if (exists) throw new ConflictException('Item code must be unique');
    }
    if (updateItemDto.hsnCode) {
      const taxCode = await this.taxCodeService.findById(updateItemDto.hsnCode).catch(() => null);
      if (!taxCode) throw new NotFoundException('HSN/TaxCode not found');
    }
    const item = await this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async delete(id: string): Promise<Item> {
    const item = await this.itemModel.findByIdAndDelete(id).exec();
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }
} 