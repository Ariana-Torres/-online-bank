import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountBank } from "./entities/account.entity";
import { AccountController } from "./controller/account.controller";
import { AccountService } from "./services/account.service";
import { Card } from "../card-bank/entities/card.entity";
import { Transaction } from "../transaction/entities/transaction.entity";
import { User } from "../auth/entities/user.entity";
import { TypeAccount } from "../type-account/entities/type-account.entity";
import { Beneficiary } from "../beneficiary/entities/beneficiary.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AccountBank, Card, Transaction,User, Beneficiary, TypeAccount])],
    controllers: [AccountController],
    providers: [AccountService],
})
export class AccountBankModule {}