import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { AccountGroupModule } from './modules/account-group/account-group.module';
import { LedgerModule } from './modules/ledger/ledger.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { AuthModule } from './modules/auth/auth.module';
import { ItemModule } from './modules/item/item.module';
import { TaxCodeModule } from './modules/tax-code/tax-code.module';
import configuration from './config/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbUri'),
      }),
      inject: [ConfigService],
    }),
    CompanyModule,
    UserModule,
    AccountGroupModule,
    LedgerModule,
    VoucherModule,
    AuthModule,
    ItemModule,
    TaxCodeModule,
  ],
})
export class AppModule {}
