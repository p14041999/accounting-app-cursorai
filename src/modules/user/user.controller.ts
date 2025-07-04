import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.' })
  async registerUser(@Body() body: RegisterUserDto) {
    return this.userService.register(body);
  }

  @Post('auth/login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'The user has been successfully logged in.' })
  async loginUser(@Body() body: LoginUserDto) {
    return this.userService.login(body);
  }

  @Get('users/profile')
  @ApiOperation({ summary: 'Get the profile of the current user' })
  @ApiResponse({ status: 200, description: 'The user profile.' })
  async getProfile() {
    // In a real app, get userId from auth token
    return null;
  }
}
