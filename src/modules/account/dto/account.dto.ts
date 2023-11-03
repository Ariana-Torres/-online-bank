import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    MaxLength,
  } from 'class-validator';
import { User } from 'src/modules/auth/entities/user.entity';

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

    @IsNotEmpty()
    @IsObject()
    users:User

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