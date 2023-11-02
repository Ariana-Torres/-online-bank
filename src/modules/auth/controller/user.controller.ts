import { LoginUserDto } from '../dtos/login-user.dto';
import { CreateUserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
  } from '@nestjs/common';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly usersService: UserService) {}
    @Post()
    async CreateUser(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUser(createUserDto);
    }
  
    @Post('login')
    async login(@Body() login: LoginUserDto) {
      return this.usersService.login(login);
    }
  
    @Get()
    findAll() {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.remove(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() createUserDto: CreateUserDto,
    ) {
      return this.usersService.update(id, createUserDto);
    }
  }
  