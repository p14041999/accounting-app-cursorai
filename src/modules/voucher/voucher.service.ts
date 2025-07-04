import { Injectable, NotFoundException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Voucher, VoucherDocument } from '../../schemas/voucher.schema';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { LedgerService } from '../ledger/ledger.service';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<VoucherDocument>,
    @Inject(forwardRef(() => LedgerService)) private ledgerService: LedgerService,
  ) {}

  async create(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    // Validate double-entry
    const debit = createVoucherDto.entries.filter(e => e.type === 'DEBIT').reduce((sum, e) => sum + e.amount, 0);
    const credit = createVoucherDto.entries.filter(e => e.type === 'CREDIT').reduce((sum, e) => sum + e.amount, 0);
    if (debit !== credit) throw new ConflictException('Debit and credit totals must match (double-entry rule)');
    // Validate ledgers exist
    for (const entry of createVoucherDto.entries) {
      await this.ledgerService.findById(entry.ledgerId);
    }
    const created = new this.voucherModel({
      ...createVoucherDto,
      company: new Types.ObjectId(createVoucherDto.companyId),
      entries: createVoucherDto.entries.map(e => ({
        ...e,
        ledger: new Types.ObjectId(e.ledgerId),
      })),
    });
    return created.save();
  }

  async findAll(filter: any = {}): Promise<Voucher[]> {
    return this.voucherModel.find(filter).exec();
  }

  async findById(id: string): Promise<Voucher> {
    const voucher = await this.voucherModel.findById(id).exec();
    if (!voucher) throw new NotFoundException('Voucher not found');
    return voucher;
  }

  async update(id: string, updateVoucherDto: UpdateVoucherDto): Promise<Voucher> {
    if (updateVoucherDto.entries) {
      const debit = updateVoucherDto.entries.filter(e => e.type === 'DEBIT').reduce((sum, e) => sum + (e.amount || 0), 0);
      const credit = updateVoucherDto.entries.filter(e => e.type === 'CREDIT').reduce((sum, e) => sum + (e.amount || 0), 0);
      if (debit !== credit) throw new ConflictException('Debit and credit totals must match (double-entry rule)');
      for (const entry of updateVoucherDto.entries) {
        if (entry.ledgerId) await this.ledgerService.findById(entry.ledgerId);
      }
    }
    const voucher = await this.voucherModel.findByIdAndUpdate(id, updateVoucherDto, { new: true }).exec();
    if (!voucher) throw new NotFoundException('Voucher not found');
    return voucher;
  }

  async delete(id: string): Promise<Voucher> {
    const voucher = await this.voucherModel.findByIdAndDelete(id).exec();
    if (!voucher) throw new NotFoundException('Voucher not found');
    return voucher;
  }
}
