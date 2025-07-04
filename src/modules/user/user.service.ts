import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const created = new this.userModel(registerUserDto);
    return created.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    // Stub: In real app, check password hash
    return this.userModel.findOne({ email: loginUserDto.email }).exec();
  }

  async getProfile(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }
}
