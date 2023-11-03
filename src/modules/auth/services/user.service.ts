
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository} from '@nestjs/typeorm';
import { CreateUserDto } from "../dtos/user.dto";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "../dtos/login-user.dto";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersImages } from "../entities/usersImages.entity";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(UsersImages)
        private readonly usersImagesRepository: Repository<UsersImages>,
    ){}
    
    async createUser(createUserDto: CreateUserDto){
        try{
            const { images=[], password, ...userDetail} = createUserDto;
            const newUser = this.userRepository.create({
                ...userDetail,
                password: bcrypt.hashSync(password, 10),
                images: images.map((image) => this.usersImagesRepository.create({
                    url: image,
                }))
            });
    
            await this.userRepository.save(newUser);
            return newUser;
        }
        catch(error){
            console.log(error);
            throw new Error(`Error creating user: ${error.message}`);
        }
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
        try{
            return await this.userRepository.find({
                order :{id: 'ASC'},
                relations: ['images'],
            })
        }
        catch(error){
            console.log(error);
            throw new Error(`Error finding users: ${error.message}`);
        }
    }

    async findOne(id: number){
        try{
            return await this.userRepository.findOne({
                where: {id},
                relations: ['images'],
            });
        }
        catch(error){
            console.log(error);
            throw new Error(`Error finding user: ${error.message}`);
        
        }
    }

    async update(id: number, updateUserDto: CreateUserDto){
        try{
            const { images=[], ...userDetail} = updateUserDto;
            const user = await this.findOne(id);
            const updatedUser = Object.assign(user, userDetail);
            await this.userRepository.save(updatedUser);
    
            if(images.length > 0){
                const newImages = images.map((image) => this.usersImagesRepository.create({
                    url: image,
                    user: updatedUser,
                }));
                await this.usersImagesRepository.save(newImages);
                updatedUser.images = newImages;
            }
    
            return updatedUser;
        }
        catch(error){
            console.log(error);
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async remove(id: number){
        try{
            const user = await this.findOne(id);
            await this.userRepository.remove(user);
            return true;
        }
        catch(error){
            console.log(error);
            throw new Error(`Error removing user: ${error.message}`);
        }
    }
}