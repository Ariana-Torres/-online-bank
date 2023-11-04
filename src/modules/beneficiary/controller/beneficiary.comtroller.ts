import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { BeneFiciaryService } from "../services/beneficiary.service";
import { CreateBeneficiaryDto } from "../dto/beneficiary.dto";
import { Beneficiary } from "../entities/beneficiary.entity";

@Controller('beneficiary')
export class BeneficiaryController{
    constructor(
        private readonly beneficiaryRepository: BeneFiciaryService
    ){}

    @Get()
    async findAll(){
        return await this.beneficiaryRepository.finAll();
    }

    async findOne(@Param('id') id: number){
        return await this.beneficiaryRepository.findOne(id);
    }

    @Post()
    async create(@Body() beneficiary: Beneficiary){
        return await this.beneficiaryRepository.create(beneficiary);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() beneficiary: Beneficiary
    ){
        return await this.beneficiaryRepository.update(id, beneficiary);
    }
}