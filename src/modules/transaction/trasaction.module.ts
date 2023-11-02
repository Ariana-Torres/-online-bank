import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "./controller/transaction.controller";
import { TransactionService } from "./services/transaction.service";
import { Transaction } from "./entities/transaction.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}