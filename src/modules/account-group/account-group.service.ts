import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AccountGroup, AccountGroupDocument } from '../../schemas/account-group.schema';
import { CreateAccountGroupDto } from './dto/create-account-group.dto';
import { UpdateAccountGroupDto } from './dto/update-account-group.dto';

@Injectable()
export class AccountGroupService {
  constructor(
    @InjectModel(AccountGroup.name) private groupModel: Model<AccountGroupDocument>,
  ) {}

  async create(createDto: CreateAccountGroupDto): Promise<AccountGroup> {
    const exists = await this.groupModel.findOne({
      name: createDto.name,
      company: new Types.ObjectId(createDto.companyId),
      parentGroup: createDto.parentGroupId ? new Types.ObjectId(createDto.parentGroupId) : null,
    });
    if (exists) throw new ConflictException('Group name must be unique within the parent group and company');
    const created = new this.groupModel({
      ...createDto,
      company: new Types.ObjectId(createDto.companyId),
      parentGroup: createDto.parentGroupId ? new Types.ObjectId(createDto.parentGroupId) : null,
    });
    return created.save();
  }

  async findAll(filter: any = {}): Promise<AccountGroup[]> {
    return this.groupModel.find(filter).exec();
  }

  async findById(id: string): Promise<AccountGroup> {
    const group = await this.groupModel.findById(id).exec();
    if (!group) throw new NotFoundException('Account group not found');
    return group;
  }

  async update(id: string, updateDto: UpdateAccountGroupDto): Promise<AccountGroup> {
    if (updateDto.name && updateDto.companyId) {
      const exists = await this.groupModel.findOne({
        name: updateDto.name,
        company: new Types.ObjectId(updateDto.companyId),
        parentGroup: updateDto.parentGroupId ? new Types.ObjectId(updateDto.parentGroupId) : null,
        _id: { $ne: id },
      });
      if (exists) throw new ConflictException('Group name must be unique within the parent group and company');
    }
    const group = await this.groupModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!group) throw new NotFoundException('Account group not found');
    return group;
  }

  async delete(id: string): Promise<AccountGroup> {
    const group = await this.groupModel.findByIdAndDelete(id).exec();
    if (!group) throw new NotFoundException('Account group not found');
    return group;
  }

  // Tree and ledgers-by-group methods (stubs)
  async getFullChartOfAccountsTree(): Promise<any> {
    // TODO: Implement tree logic
    return [];
  }

  async getLedgersUnderGroup(groupId: string): Promise<any> {
    // TODO: Implement ledgers-by-group logic
    return [];
  }
}
