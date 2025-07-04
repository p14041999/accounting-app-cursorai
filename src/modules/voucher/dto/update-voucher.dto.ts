export class UpdateVoucherDto {
  type?: 'PAYMENT' | 'RECEIPT' | 'JOURNAL' | 'CONTRA';
  companyId?: string;
  date?: Date;
  narration?: string;
  entries?: {
    ledgerId: string;
    amount: number;
    type: 'DEBIT' | 'CREDIT';
  }[];
}
