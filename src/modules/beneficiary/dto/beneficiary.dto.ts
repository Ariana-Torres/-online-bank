import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBeneficiaryDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;
}