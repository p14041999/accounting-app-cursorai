import { IsString, IsEmail, IsIn, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;

  @IsIn(['ADMIN', 'ACCOUNTANT', 'AUDITOR'])
  role: 'ADMIN' | 'ACCOUNTANT' | 'AUDITOR';
}
