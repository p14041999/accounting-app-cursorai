import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the user', minLength: 6, maxLength: 100, example: 'strongPassword123' })
  @IsString()
  @Length(6, 100)
  password: string;
}
