export class UpdateAccountGroupDto {
  name?: string;
  alias?: string;
  parentGroupId?: string;
  nature?: 'ASSET' | 'LIABILITY' | 'INCOME' | 'EXPENSE';
  companyId?: string;
}
