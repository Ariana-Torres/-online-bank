import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Beneficiary } from "./entities/beneficiary.entity";
import { BeneficiaryController } from "./controller/beneficiary.comtroller";
import { BeneFiciaryService } from "./services/beneficiary.service";

@Module({
    imports: [TypeOrmModule.forFeature([Beneficiary])],
    controllers: [BeneficiaryController],
    providers: [BeneFiciaryService]
})

export class BeneficiaryModule{}