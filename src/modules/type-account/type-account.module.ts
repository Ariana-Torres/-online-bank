import { Module } from "@nestjs/common";
import { TypeAccount } from './entities/type-account.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeAccountController } from "./controllers/type-account.controller";
import { TypeAccountService } from "./services/type-account.service";

@Module({
    imports: [TypeOrmModule.forFeature([TypeAccount])],
    controllers: [TypeAccountController],
    providers: [TypeAccountService],

})
export class TypeAccountModule{}