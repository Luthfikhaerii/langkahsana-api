import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ParticipantQueryDto } from './dto/participant-query.dto';
import { ParticipantCreateDto } from './dto/participant-create.dto';

@Injectable()
export class ParticipantService {
    constructor(private prisma: PrismaService) { }

    async getAll(query:ParticipantQueryDto) {
        const {limit,page} = query
        try {
            const participants = this.prisma.participant.findMany({
                skip: (page-1)*limit,
                take: limit,
                orderBy:{
                    id:'desc'
                }
            }) 
            return participants
        } catch (err) {
            throw err
        }
    }

    async create(dto:ParticipantCreateDto) {
        const {name,trip_id,no_whatsapp,no_darurat,address,meet_point,payment_proof} = dto
        try {
            const participant = await this.prisma.participant.create({
                data:{
                    name,trip_id,no_whatsapp,no_darurat,address,meet_point,payment_proof
                }
            })
            return participant
        } catch (err) {
            throw err
        }
    }

    async delete(id:number) {
        try {
            await this.prisma.participant.delete({
                where:{id}
            })
        } catch (err) {
            throw err
        }
    }
}
