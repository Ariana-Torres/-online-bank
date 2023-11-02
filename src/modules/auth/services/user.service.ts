
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository} from '@nestjs/typeorm';
import { CreateUserDto } from "../dtos/user.dto";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "../dtos/login-user.dto";
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}
    
    async createUser(createUserDto: CreateUserDto){
        const { password, ...userDetail} = createUserDto;
        const newUser = this.userRepository.create({
            ...userDetail,
            password: bcrypt.hashSync(password, 10),
        });

        await this.userRepository.save(newUser);
        return newUser;
    }

    async login(logiUserDto: LoginUserDto){
        const {password, email} = logiUserDto;
        const user = await this.userRepository.findOne({
            where: {email},
            select:{password: true, email: true},
        });

        if(!user){
            throw new UnauthorizedException('User not found');

        }
        if(!bcrypt.compareSync(password, user.password)){
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async findAll(){
        return await this.userRepository.find({order:{id: 'ASC'}})
    }

    async findOne(id: number){
        return await this.userRepository.findOne({
            where:{id}
        });
    }

    async update(id: number, updateUserDto: CreateUserDto){
        const user = await this.findOne(id);
        const {password, ...userDetail} = updateUserDto;
        const updatedUser = Object.assign(user, userDetail);
        await this.userRepository.save(updatedUser);
        return updatedUser;
    }

    async remove(id: number){
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
        return user;
    }
}