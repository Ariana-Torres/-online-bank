import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountBank } from "./entities/account.entity";
import { AccountController } from "./controller/account.controller";
import { AccountService } from "./services/account.service";
import { Card } from "../card-bank/entities/card.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AccountBank, Card])],
    controllers: [AccountController],
    providers: [AccountService],
})
export class AccountBankModule {}