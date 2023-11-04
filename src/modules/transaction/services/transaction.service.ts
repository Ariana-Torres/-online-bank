import { Body, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTransactionDto } from "../dtos/trasaction.dto";
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionService{
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>
    ){}

    async create(transaction: CreateTransactionDto): Promise<Transaction>{
        try{
            const {propietary ,beneficiaryId, ...transactionDetail} = transaction;
            const newTransaction = this.transactionRepository.create({
                ...transactionDetail,
                beneficiary: beneficiaryId ? [{id: beneficiaryId}] : [],
                propietary, 
            });
            await this.transactionRepository.save(newTransaction);
            return newTransaction;
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }

    async findOne(id: number): Promise<Transaction>{
        try{
            return await this.transactionRepository.findOne({where:{id}});
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }
    async remove(id: number): Promise<Transaction>{
        try{
            const deleteTransaction = await this.transactionRepository.findOne({where:{id}});
            return await this.transactionRepository.remove(deleteTransaction);
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }
}