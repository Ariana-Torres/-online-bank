import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
  } from 'class-validator';

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

    @IsString()
    @IsNotEmpty()
    user: string;

    @IsDate()
    @IsNotEmpty()
    dateCreated: Date;

    @IsString()
    @IsNotEmpty()
    typeAccount: string;

    @IsDate()
    @IsNotEmpty()
    expirationDate: Date;

    @IsString()
    @IsNotEmpty()
    cards: string;

    @IsBoolean()
    @IsOptional()
    active: boolean;

    @IsString()
    @IsNotEmpty()
    beneficiary: string;
}