import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import express from 'express';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/auth.decorator';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,private authService:AuthService) { }

    @Get()
    async getUser() {
        return this.userService.get()
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: { email: string, password: string }, @Res({ passthrough: true }) res: express.Response) {
        const {token,user} = await this.userService.login({ email: body.email, password: body.password })
        res.cookie('token', token, { httpOnly: true, secure: true, path: '/', sameSite: 'none' })
        return { message: "login success!",data:user }
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: UserRegisterDto , @Res({ passthrough: true }) res: express.Response) {
        const { user, token } = await this.userService.register(body)
        res.cookie('token', token, {
            httpOnly: true, secure: true, path: "/", sameSite: 'none'
        })
        return { 
            message:"register success!",
            user :{email: user.email, role: user.role} 
        }
    }

    @Delete('logout')
    @UseGuards(AuthGuard)
    @Role('admin')
    @HttpCode(HttpStatus.OK)
    async logout(@Res({passthrough:true}) res:express.Response){
        res.clearCookie('token',{
            httpOnly:true,
            path:'/',
            secure:true,
            sameSite:'none'
        })
        return {message:"logout success!"}
    }

    @Get('auth')
    @UseGuards(AuthGuard)
    @Role('admin')
    async auth(@Req() req:express.Request){
        const {token} = req.cookies
        const user = this.authService.verifyToken(token)
        return {
            message:"user authenticated!",
            data:{
                email: user.email,
                role:user.role
            }
        }
    }

}
