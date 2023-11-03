import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { AccountBankModule } from './modules/account/account.module';
import { TransactionModule } from './modules/transaction/trasaction.module';
import { CardModule } from './modules/card-bank/card.module';
import { BeneficiaryModule } from './modules/beneficiary/beneficiary.module';
import { TypeAccountModule } from './modules/type-account/type-account.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password:'12345678',
    database: 'onlinebank',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  AuthModule,
  FilesModule,
  AccountBankModule,
  TransactionModule,
  CardModule,
  BeneficiaryModule,
  TypeAccountModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
