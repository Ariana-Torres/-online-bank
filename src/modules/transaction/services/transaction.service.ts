import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTransactionDto } from "../dtos/trasaction.dto";
import { Transaction } from '../entities/transaction.entity';
import { AccountBank } from "src/modules/account/entities/account.entity";
import { User } from "src/modules/auth/entities/user.entity";
import { Beneficiary } from "src/modules/beneficiary/entities/beneficiary.entity";

@Injectable()
export class TransactionService{
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,

        @InjectRepository(AccountBank)
        private readonly accountRepository: Repository<AccountBank>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Beneficiary)
        private readonly beneficariaryRepository: Repository<Beneficiary>
    ){}

    async create(transaction: CreateTransactionDto): Promise<Transaction> {
        try {
          const { propietaryId, beneficiaryId, accountId, ...transactionDetail } = transaction;
      
          // Verificar si existe la cuenta
          const account = await this.accountRepository.findOne({
            where: { id: accountId }});
          if (!account) {
            throw new NotFoundException(`No se encontró la cuenta con ID ${accountId}`);
          }
      
          // Verificar si existe el propietario
          const propietary = await this.userRepository.findOne({where:{id: propietaryId}});
          if (!propietary) {
            throw new NotFoundException(`No se encontró el propietario con ID ${propietaryId}`);
          }
      
          // Verificar si existe el beneficiario
          const beneficiary = await this.beneficariaryRepository.findOne({where:{id: beneficiaryId}});
          if (!beneficiary) {
            throw new NotFoundException(`No se encontró el beneficiario con ID ${beneficiaryId}`);
          }
      
          const newTransaction = this.transactionRepository.create({
            ...transactionDetail,
            beneficiary: { id: beneficiaryId },
            account: { id: accountId },
            propietary: { id: propietaryId },
          });
      
          await this.transactionRepository.save(newTransaction);
      
          return newTransaction;
        } catch (error) {
          if (error instanceof NotFoundException) {
            throw error;
          }
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