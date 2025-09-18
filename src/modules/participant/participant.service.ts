import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParticipantService {
    constructor(private prismaService:PrismaService){}

    async createPartipant(){
        
    }
}
