import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Beneficiary } from "../entities/beneficiary.entity";
import { Repository } from "typeorm";
import { CreateBeneficiaryDto } from "../dto/beneficiary.dto";

@Injectable()
export class BeneFiciaryService{
    constructor(
        @InjectRepository(Beneficiary)
        private readonly beneficiaryRepository: Repository<Beneficiary>
    ){}

    async create(beneficiary: CreateBeneficiaryDto): Promise<Beneficiary>{
        try{
            const {accountId, ...beneficiaryDetail} = beneficiary;
            const newBeneficiary = this.beneficiaryRepository.create({
                ...beneficiaryDetail,
                account: accountId ? [{id: accountId}] : []
            });
            await this.beneficiaryRepository.save(newBeneficiary);
            return newBeneficiary;
        }
        catch(error){
            if (error.code === '23505'){
                throw new NotFoundException('Ya existe un beneficiario con ese nombre');
            }
        }
    }

    async finAll(): Promise<Beneficiary[]>{
        try{
            const beneficiaries = await this.beneficiaryRepository.find({relations: ['account']});
            if (!beneficiaries) throw new NotFoundException('No se encontraron beneficiarios');
            return beneficiaries;

        }
        catch(error){
            if (error instanceof NotFoundException){
                throw new NotFoundException(error.message);
               
            }
        }
    }
    async findOne(id: number): Promise<Beneficiary>{
        try{
            const beneficiary = await this.beneficiaryRepository.findOne({where:{id}, relations: ['account']});
            if (!beneficiary) throw new NotFoundException('No se encuetra el beneficiario');
            return beneficiary;
        }
        catch(error){
            if (error instanceof NotFoundException){
                throw new NotFoundException(error.message);
               
            }
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
            if(!beneficiary) throw new NotFoundException(`no existe el beneficiario con id ${beneficiary.name}`)
            await this.beneficiaryRepository.delete(id);
            return beneficiary;
        }
        catch(error){
            if(error instanceof NotFoundException){
                throw new NotFoundException(error.message)
            }
        }
    }
}