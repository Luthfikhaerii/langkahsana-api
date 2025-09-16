import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){}

    async create(data:{email:string,password:string}){
        return this.prisma.user.create({
            data:{
                email:data.email,
                password:data.password
            }
        })
    }

    async get(){
        return this.prisma.user.findMany()
    }
}
