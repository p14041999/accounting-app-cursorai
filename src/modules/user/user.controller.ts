import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/register')
  async registerUser(@Body() body: RegisterUserDto) {
    return this.userService.register(body);
  }

  @Post('auth/login')
  async loginUser(@Body() body: LoginUserDto) {
    return this.userService.login(body);
  }

  @Get('users/profile')
  async getProfile() {
    // In a real app, get userId from auth token
    return null;
  }
}
