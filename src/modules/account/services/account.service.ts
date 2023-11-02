import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountBank } from "../entities/account.entity";
import { Repository } from "typeorm";
import { CreateAccountDto } from "../dto/account.dto";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountBank)
        private readonly accountRepository: Repository<AccountBank>
    ) {}

    async create( account: CreateAccountDto): Promise<AccountBank> {
        try{
            const newAccount = this.accountRepository.create(account);
            return await this.accountRepository.save(newAccount);
        }
        catch(error){
           throw new Error(`Error: ${error.message}`);
        }
    }

    async findAll(): Promise<AccountBank[]> {
      try{
        return this.accountRepository.find();
      }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }

    async findOne(id: number): Promise<AccountBank> {
       try{
        return this.accountRepository.findOne({where:{id}});
       }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }

    async update(id: number, account: CreateAccountDto): Promise<AccountBank> {
        try {
            const updateAccount = await this.accountRepository.findOne({where:{id}});
            this.accountRepository.merge(updateAccount, account);
            return this.accountRepository.save(updateAccount);
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    async remove(id: number): Promise<AccountBank> {
       try{
        const deleteAccount = await this.accountRepository.findOne({where:{id}});
        return this.accountRepository.remove(deleteAccount);
       }
       catch(error){
              throw new Error(`Error: ${error.message}`);
       }
    }
}