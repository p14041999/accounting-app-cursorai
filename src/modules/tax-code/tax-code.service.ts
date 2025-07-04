import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaxCode, TaxCodeDocument } from '../../schemas/tax-code.schema';
import { CreateTaxCodeDto } from './dto/create-tax-code.dto';
import { UpdateTaxCodeDto } from './dto/update-tax-code.dto';

@Injectable()
export class TaxCodeService {
  constructor(
    @InjectModel(TaxCode.name) private taxCodeModel: Model<TaxCodeDocument>,
  ) {}

  async create(createTaxCodeDto: CreateTaxCodeDto): Promise<TaxCode> {
    if (createTaxCodeDto.code) {
      const exists = await this.taxCodeModel.findOne({ code: createTaxCodeDto.code, company: createTaxCodeDto.company });
      if (exists) throw new ConflictException('HSN/SAC code must be unique for the company');
    }
    const created = new this.taxCodeModel(createTaxCodeDto);
    return created.save();
  }

  async findAll(filter: any = {}): Promise<TaxCode[]> {
    return this.taxCodeModel.find(filter).exec();
  }

  async findById(id: string): Promise<TaxCode> {
    const taxCode = await this.taxCodeModel.findById(id).exec();
    if (!taxCode) throw new NotFoundException('Tax code not found');
    return taxCode;
  }

  async update(id: string, updateTaxCodeDto: UpdateTaxCodeDto): Promise<TaxCode> {
    if (updateTaxCodeDto.code) {
      const exists = await this.taxCodeModel.findOne({ code: updateTaxCodeDto.code, _id: { $ne: id } });
      if (exists) throw new ConflictException('HSN/SAC code must be unique');
    }
    const taxCode = await this.taxCodeModel.findByIdAndUpdate(id, updateTaxCodeDto, { new: true }).exec();
    if (!taxCode) throw new NotFoundException('Tax code not found');
    return taxCode;
  }

  async delete(id: string): Promise<TaxCode> {
    const taxCode = await this.taxCodeModel.findByIdAndDelete(id).exec();
    if (!taxCode) throw new NotFoundException('Tax code not found');
    return taxCode;
  }
} 