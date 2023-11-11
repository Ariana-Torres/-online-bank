import { Body, Injectable, NotFoundException } from "@nestjs/common";
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
            const {propietaryId ,beneficiaryId,accountId,  ...transactionDetail} = transaction;
            const newTransaction = this.transactionRepository.create({
                ...transactionDetail,
                beneficiary: beneficiaryId ? [{id: beneficiaryId}] : [],
                account: accountId ? [{id: accountId}] : [],
                propietary: propietaryId ? [{id: propietaryId}] : []
            });
            await this.transactionRepository.save(newTransaction);
            return newTransaction;
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }

    async findAll(): Promise<Transaction[]>{
        try{
            const get = await this.transactionRepository.find();

            if(!get) throw new NotFoundException('No se encontraron transacciones');
            return get;
        }
        catch(error){
            if(error instanceof NotFoundException) throw error;
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