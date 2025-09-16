import { Body, Controller, Get,Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    async createUser(@Body() body:{email:string,password:string}){
        return this.userService.create(body)
    }

    @Get()
    async getUser(){
        return this.userService.get()
    }
}
