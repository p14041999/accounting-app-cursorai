import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ledger, LedgerDocument } from '../../schemas/ledger.schema';
import { CreateLedgerDto } from './dto/create-ledger.dto';
import { UpdateLedgerDto } from './dto/update-ledger.dto';

@Injectable()
export class LedgerService {
  constructor(
    @InjectModel(Ledger.name) private ledgerModel: Model<LedgerDocument>,
  ) {}

  async create(createLedgerDto: CreateLedgerDto): Promise<Ledger> {
    const exists = await this.ledgerModel.findOne({
      name: createLedgerDto.name,
      company: new Types.ObjectId(createLedgerDto.companyId),
      group: new Types.ObjectId(createLedgerDto.groupId),
    });
    if (exists) throw new ConflictException('Ledger name must be unique within the group and company');
    const created = new this.ledgerModel({
      ...createLedgerDto,
      company: new Types.ObjectId(createLedgerDto.companyId),
      group: new Types.ObjectId(createLedgerDto.groupId),
    });
    return created.save();
  }

  async findAll(filter: any = {}): Promise<Ledger[]> {
    return this.ledgerModel.find(filter).exec();
  }

  async findById(id: string): Promise<Ledger> {
    const ledger = await this.ledgerModel.findById(id).exec();
    if (!ledger) throw new NotFoundException('Ledger not found');
    return ledger;
  }

  async update(id: string, updateLedgerDto: UpdateLedgerDto): Promise<Ledger> {
    if (updateLedgerDto.name && updateLedgerDto.companyId && updateLedgerDto.groupId) {
      const exists = await this.ledgerModel.findOne({
        name: updateLedgerDto.name,
        company: new Types.ObjectId(updateLedgerDto.companyId),
        group: new Types.ObjectId(updateLedgerDto.groupId),
        _id: { $ne: id },
      });
      if (exists) throw new ConflictException('Ledger name must be unique within the group and company');
    }
    const ledger = await this.ledgerModel.findByIdAndUpdate(id, updateLedgerDto, { new: true }).exec();
    if (!ledger) throw new NotFoundException('Ledger not found');
    return ledger;
  }

  async delete(id: string): Promise<Ledger> {
    const ledger = await this.ledgerModel.findByIdAndDelete(id).exec();
    if (!ledger) throw new NotFoundException('Ledger not found');
    return ledger;
  }
}
