import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TransactionService } from "../services/transaction.service";
import { CreateTransactionDto } from "../dtos/trasaction.dto";

@Controller('trasaction')
export class TransactionController {
    constructor(private readonly transactionRepository: TransactionService) {}

    @Get()
    async findAll() {
        return this.transactionRepository.findAll();
    }

    @Get(':id')
    async findOne(id: number) {
        return this.transactionRepository.findOne(id)
    }

    @Post()
    async create(@Body() createTransactionDto: CreateTransactionDto)  {
        return this.transactionRepository.create(createTransactionDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateTransactionDto: CreateTransactionDto,
    ) {
        return this.transactionRepository.update(id, updateTransactionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.transactionRepository.remove(id);
    }


}