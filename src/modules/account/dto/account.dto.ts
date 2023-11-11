import {
  IsArray,
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
import { TypeAccount } from 'src/modules/type-account/entities/type-account.entity';

export class CreateAccountDto{
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNumber()
    @IsNotEmpty()
    accountNumber: number;

    @IsNumber()
    @IsNotEmpty()
    balance: number;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsDate()
    @IsNotEmpty()
    dateCreated: Date;

    @IsNumber()
    @IsOptional()
    typeAccountId: number;

    @IsDate()
    @IsNotEmpty()
    expirationDate: Date;

    @IsArray({ each: true })
    @IsString()
    @IsOptional()
    cards?: { cardNumber: string; cardType: string; expirationDate: string }[];

    @IsBoolean()
    @IsOptional()
    active: boolean;

    @IsNumber()
    @IsOptional()
    beneficiaryId: number;
}