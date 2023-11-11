import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountBank } from "../entities/account.entity";
import { Repository } from "typeorm";
import { CreateAccountDto } from "../dto/account.dto";
import { Card } from "src/modules/card-bank/entities/card.entity";
import { Transaction } from "src/modules/transaction/entities/transaction.entity";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountBank)
        private readonly accountRepository: Repository<AccountBank>,

        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card>,
        
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    ) {}

    async create(account: CreateAccountDto,  ): Promise<AccountBank> {
        try {
          const { cards=[],beneficiaryId, typeAccountId, userId, ...accountDetail } = account;
          const newAccount = this.accountRepository.create({
            ...accountDetail,
            users:userId? [{ id: userId }]:[],
            typeAccount:typeAccountId? [{ id: typeAccountId }]: [],
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
        try {
          const getAccount = await this.accountRepository.find({
            relations: ['users', 'cards', 'typeAccount', 'beneficiaries', 'transactions']
          });
      
          if (!getAccount || getAccount.length === 0) {
            throw new NotFoundException('No se encontraron cuentas');
          }
      
          return getAccount;
        } catch (error) {
          if (error instanceof NotFoundException) {
            throw error;
          }
          throw new Error(`Error: ${error.message}`);
        }
    }
      

    async findOne(id: number): Promise<AccountBank> {
        try {
          const getAccount = await this.accountRepository.findOne({
            where: { id },
            relations: ['users', 'cards', 'typeAccount', 'beneficiaries', 'transactions']
          });
      
          if (!getAccount) {
            throw new NotFoundException('No se encontró la cuenta');
          }
      
          return getAccount;
        } catch (error) {
          if (error instanceof NotFoundException) {
            throw error;
          }
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
    async remove(id: number): Promise<void> {
      try {
        const account = await this.accountRepository.findOne({ where: { id }, relations: ['transactions'] });
    
        if (!account) {
          throw new Error('Account not found');
        }
    
        // Eliminar manualmente las transacciones asociadas
        await this.transactionRepository.remove(account.transactions);
    
        // Finalmente, eliminar la cuenta
        await this.accountRepository.remove(account);

        return

      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    }
    
}