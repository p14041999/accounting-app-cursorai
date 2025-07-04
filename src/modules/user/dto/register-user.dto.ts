import { IsString, IsEmail, IsIn, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ description: 'Full name of the user', minLength: 2, maxLength: 100, example: 'John Doe' })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the user', minLength: 6, maxLength: 100, example: 'strongPassword123' })
  @IsString()
  @Length(6, 100)
  password: string;

  @ApiProperty({ description: 'Role of the user', enum: ['ADMIN', 'ACCOUNTANT', 'AUDITOR'], example: 'ADMIN' })
  @IsIn(['ADMIN', 'ACCOUNTANT', 'AUDITOR'])
  role: 'ADMIN' | 'ACCOUNTANT' | 'AUDITOR';
}
