export class CreateAccountGroupDto {
  name: string;
  alias?: string;
  parentGroupId?: string; // null = root group
  nature: 'ASSET' | 'LIABILITY' | 'INCOME' | 'EXPENSE';
  companyId: string;
}
