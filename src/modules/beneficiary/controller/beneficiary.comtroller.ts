import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { BeneFiciaryService } from "../services/beneficiary.service";
import { CreateBeneficiaryDto } from "../dto/beneficiary.dto";

@Controller('beneficiary')
export class BeneficiaryController{
    constructor(
        private readonly beneficiaryRepository: BeneFiciaryService
    ){}

    @Get()
    async findAll(){
        return await this.beneficiaryRepository.finAll();
    }

    @Get(':id')
    async findOne(id: number){
        return await this.beneficiaryRepository.findOne(id);
    }

    @Post()
    async create(@Body() beneficiary: CreateBeneficiaryDto){
        return await this.beneficiaryRepository.create(beneficiary);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() beneficiary: CreateBeneficiaryDto
    ){
        return await this.beneficiaryRepository.update(id, beneficiary);
    }
}