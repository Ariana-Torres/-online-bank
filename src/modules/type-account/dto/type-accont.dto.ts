import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTypeAccountDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    typeAccount: string;
}
