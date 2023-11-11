import { Injectable, NotFoundException } from "@nestjs/common";
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
          const { cards=[],beneficiaryId, typeAccount, userId, ...accountDetail } = account;
          const newAccount = this.accountRepository.create({
            ...accountDetail,
            users: userId ? [{ id: userId }] : [], //mer sirve para crear un array de objetos de tipo user
            typeAccount,
            beneficiaries: beneficiaryId ? [{ id: beneficiaryId }] : [], //mer sirve para crear un array de objetos de tipo beneficiary
            cards: cards.map((card) => this.cardRepository.create({
                ...card, //creo un objeto de tipo card
            })),
          });
    
          await this.accountRepository.save(newAccount); //guardo la cuenta con las relaciones
          return newAccount;
        } catch (error) {
          throw new Error(`Error creating account: ${error.message}`);
        }
      }
 
    async findAll(): Promise<AccountBank[]> {
      try{
        const getAccount =  this.accountRepository.find({
            relations: ['users', 'cards','typeAccount', 'beneficiaries', 'transaction']//traigo las relaciones de la cuenta
        });
        if(!getAccount) throw new NotFoundException('No se encontraron cuentas');
        return getAccount;
      }
        catch(error){
            if(error instanceof NotFoundException) throw error;
            throw new Error(`Error: ${error.message}`);
        }
    }

    async findOne(id: number): Promise<AccountBank> {
       try{
        return this.accountRepository.findOne({where:{id}, relations: ['users', 'cards','typeAccount', 'beneficiaries', 'transaction']});
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