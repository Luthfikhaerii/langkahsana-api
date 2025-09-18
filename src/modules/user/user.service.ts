import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserRegisterDto } from './dto/user-register.dto';

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService,private authService:AuthService){}

    async get(){
        return this.prisma.user.findMany()
    }

    async login(data:{email:string,password:string}){
        const user = await this.prisma.user.findUnique({
            where:{
                email:data.email
            }
        })
        if(user?.password !== data.password) throw new UnauthorizedException('') 
        const token = this.authService.generateToken({email:data.email,role:user?.role})
        return token
    }

    async register(data:UserRegisterDto){ 
        const existUser = await this.prisma.user.findUnique({where:{email:data.email}})
        if(existUser) throw new BadRequestException('User was exist!')
        
        const user = await this.prisma.user.create({
            data:{
                email:data.email,
                password:data.password,
                role:data.role
            }
        })
        const token = this.authService.generateToken({email:data.email,role:data.role})
        return {
            token,user
        }
    }
}
