import {
  IsArray,
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

    @IsNotEmpty()
    @IsObject()
    users:User

    @IsDate()
    @IsNotEmpty()
    dateCreated: Date;

    @IsNotEmpty()
    @IsArray()
    typeAccount: TypeAccount;

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

    @IsNumber()
    @IsOptional()
    transactionId: number;
}