import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./controller/user.controller";
import { UserService } from './services/user.service';
import { UsersImages } from "./entities/usersImages.entity";
import { Card } from "../card-bank/entities/card.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, UsersImages])],
    controllers: [UserController],
    providers: [UserService],
})
export class AuthModule {}