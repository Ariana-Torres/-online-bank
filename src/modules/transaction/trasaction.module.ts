import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "./controller/transaction.controller";
import { TransactionService } from "./services/transaction.service";
import { Transaction } from "./entities/transaction.entity";
import { AccountBank } from "../account/entities/account.entity";
import { User } from "../auth/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, AccountBank, User])],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}