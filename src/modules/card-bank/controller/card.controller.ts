import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CardService } from "../services/card.service";
import { CreateCardDto } from "../dto/card.dto";

@Controller('card')
export class CardController{
    constructor(private readonly cardRepository: CardService){}
    @Get(':id')
    async findOne(id: number){
        return await this.cardRepository.findOne(id);
    }

    @Post()
    async create(@Body() card: CreateCardDto){
        return await this.cardRepository.create(card);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() card: CreateCardDto
    ){
        return await this.cardRepository.update(id, card);
    }

    @Delete(':id')
    async delete(id: number){
        return await this.cardRepository.delete(id);
    }
}