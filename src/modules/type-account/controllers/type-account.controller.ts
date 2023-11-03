import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { TypeAccountService } from "../services/type-account.service";
import { CreateTypeAccountDto } from "../dto/type-accont.dto";

@Controller('type-account')
export class TypeAccountController{
    constructor(
        private readonly typeAccountService: TypeAccountService
    ){}

    @Post()
    async create(@Body() typeAccount: CreateTypeAccountDto){
        return await this.typeAccountService.create(typeAccount);
    }

    @Delete(':id')
    async delete(id: number){
        return await this.typeAccountService.delete(id);
    }

    @Get()
    async findAll(){
        return await this.typeAccountService.findAll();
    }
}