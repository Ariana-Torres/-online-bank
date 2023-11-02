import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Beneficiary } from "../entities/beneficiary.entity";
import { Repository } from "typeorm";

@Injectable()
export class BeneFiciaryService{
    constructor(
        @InjectRepository(Beneficiary)
        private readonly beneficiaryRepository: Repository<Beneficiary>
    ){}

    async create(beneficiary: Beneficiary): Promise<Beneficiary>{
        try{
            const newBeneficiary = this.beneficiaryRepository.create(beneficiary);
            await this.beneficiaryRepository.save(newBeneficiary);
            return newBeneficiary;
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }

    async finAll(): Promise<Beneficiary[]>{
        try{
            return await this.beneficiaryRepository.find();
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }
    async findOne(id: number): Promise<Beneficiary>{
        try{
            return await this.beneficiaryRepository.findOne({where:{id}});
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }

    async update(id: number, beneficiary: Beneficiary): Promise<Beneficiary>{
        try{
            await this.beneficiaryRepository.update(id, beneficiary);
            return await this.beneficiaryRepository.findOne({where:{id}});
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }

    async delete(id: number): Promise<Beneficiary>{
        try{
            const beneficiary = await this.beneficiaryRepository.findOne({where:{id}});
            await this.beneficiaryRepository.delete(id);
            return beneficiary;
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }
}