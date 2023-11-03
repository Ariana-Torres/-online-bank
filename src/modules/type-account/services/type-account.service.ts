import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeAccount } from "../entities/type-account.entity";
import { Repository } from "typeorm";
import { CreateTypeAccountDto } from "../dto/type-accont.dto"; 

@Injectable()
export class TypeAccountService{
    constructor(
        @InjectRepository(TypeAccount)
        private readonly typeAccountRepository: Repository<TypeAccount>
    ){}

    async create(typeAccount: CreateTypeAccountDto): Promise<TypeAccount>{
        try{
            const newTypeAccount = this.typeAccountRepository.create(typeAccount);
            await this.typeAccountRepository.save(newTypeAccount);
            return newTypeAccount;
        }
        catch(error){
            throw new Error(`error al crear un tipo de cuenta: ${error.message}`);
        }
    }

    async findAll(): Promise<TypeAccount[]>{
        try{
            return await this.typeAccountRepository.find();
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }

    async delete(id: number): Promise<TypeAccount>{
        try{
            const typeAccount = await this.typeAccountRepository.findOne({where:{id}});
            await this.typeAccountRepository.delete(id);
            return typeAccount;
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }
}