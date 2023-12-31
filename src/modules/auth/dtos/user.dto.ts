import {
  IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    password: string;
  
    @IsString()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    sexo: string;
  
    @IsBoolean()
    @IsOptional()
    active: boolean;

    @IsArray({ each: true })
    @IsString()
    @IsOptional()
    images?: string[];

  }
  