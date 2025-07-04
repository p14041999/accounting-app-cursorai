export class CreateLedgerDto {
  name: string;
  companyId: string;
  groupId: string; // now references AccountGroup
  openingBalance?: number;
}
