import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Card } from "../entities/card.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCardDto } from "../dto/card.dto";

@Injectable()
export class CardService{
    constructor(
        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card>
    ){}


    async findOne(id: number): Promise<Card>{
        try{
            return await this.cardRepository.findOne({where:{id}});
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }

    async findAll(): Promise<Card[]>{
        try{
            const get = await this.cardRepository.find();
            return get;
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }

    async create(card: CreateCardDto): Promise<Card>{
        try{
            const newCard = this.cardRepository.create(card);
            await this.cardRepository.save(newCard);
            return newCard;
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }    
    }

    async update(id: number, card: CreateCardDto): Promise<Card>{
        try{
            await this.cardRepository.update(id, card);
            return await this.cardRepository.findOne({where:{id}});
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }

    async delete(id: number): Promise<Card>{
        try{
            const card = await this.cardRepository.findOne({where:{id}});
            await this.cardRepository.delete(id);
            return card;
        }
        catch(error){
            throw new Error(`Error: ${error.message}`);
        }
    }
}