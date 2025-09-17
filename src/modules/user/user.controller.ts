import { Body, Controller, Get,Post, Res } from '@nestjs/common';
import express from 'express';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,private authService: AuthService){}

    @Post()
    async createUser(@Body() body:{email:string,password:string}){
        return this.userService.create(body)
    }

    @Get()
    async getUser(){
        return this.userService.get()
    }

    @Post('login')
    async login(@Body() body:{email:string,password:string},@Res({passthrough:true}) res:express.Response){
        const token = await this.userService.login({email:body.email,password:body.password})
        res.cookie('token',token,{httpOnly:true,secure:true,path:'/',sameSite:'none'})
        return res.send({message:"login success!"})
    }
}
