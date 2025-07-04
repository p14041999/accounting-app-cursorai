import { IsString, IsOptional, IsIn, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAccountGroupDto {
  @ApiPropertyOptional({ description: 'Name of the account group', example: 'Current Assets' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiPropertyOptional({ description: 'Alias for the account group', example: 'Assets' })
  @IsOptional()
  @IsString()
  alias?: string;

  @ApiPropertyOptional({ description: 'Parent group ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsOptional()
  @IsString()
  parentGroupId?: string;

  @ApiPropertyOptional({ description: 'Nature of the group', enum: ['ASSET', 'LIABILITY', 'INCOME', 'EXPENSE'], example: 'ASSET' })
  @IsOptional()
  @IsIn(['ASSET', 'LIABILITY', 'INCOME', 'EXPENSE'])
  nature?: 'ASSET' | 'LIABILITY' | 'INCOME' | 'EXPENSE';

  @ApiPropertyOptional({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsOptional()
  @IsString()
  companyId?: string;
}
