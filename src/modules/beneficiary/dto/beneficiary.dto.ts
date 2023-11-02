import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBeneficiaryDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    accountNumber: string;

    @IsNotEmpty()
    @IsString()
    TypeAccount: string;

    @IsOptional()
    @IsNumber()
    accountId: number;
}