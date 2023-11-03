import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountBank } from "../entities/account.entity";
import { Repository } from "typeorm";
import { CreateAccountDto } from "../dto/account.dto";
import { Card } from "src/modules/card-bank/entities/card.entity";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountBank)
        private readonly accountRepository: Repository<AccountBank>,

        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card>
    ) {}

    async create(account: CreateAccountDto,  ): Promise<AccountBank> {
        try {
          const { cards=[], typeAccount, users, ...accountDetail } = account;
          const newAccount = this.accountRepository.create({
            ...accountDetail,
            users,
            typeAccount,
            cards: cards.map((card) => this.cardRepository.create({
                ...card,
            })),
          });
    
          await this.accountRepository.save(newAccount);
          return newAccount;
        } catch (error) {
          throw new Error(`Error creating account: ${error.message}`);
        }
      }

    async findAll(): Promise<AccountBank[]> {
      try{
        return this.accountRepository.find({
            relations: ['users', 'cards','typeAccount']
        });
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