import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCardDto{
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    cardNumber: string;

    @IsString()
    @IsNotEmpty()
    cardType: string;

    @IsNotEmpty()
    @IsDate()
    expirationDate: Date;

    @IsOptional()
    @IsNumber()
    accountId: number;
}