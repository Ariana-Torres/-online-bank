import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AccountService } from "../services/account.service";
import { CreateAccountDto } from "../dto/account.dto";

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get()
    async findAll() {
        return this.accountService.findAll();
    }

    @Get(':id')
    async findOne(id: number) {
        return this.accountService.findOne(id)
    }

    @Post()
    async create(@Body() createAccountDto: CreateAccountDto) {
        return this.accountService.create(createAccountDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateAccountDto: CreateAccountDto
    ) {
        return this.accountService.update(id, updateAccountDto);
    }
}