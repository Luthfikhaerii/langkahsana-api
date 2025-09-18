import { Injectable } from '@nestjs/common';
import { TripQueryDto } from './dto/trip-query.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TripService {
    constructor(private prisma: PrismaService) { }

    async getAll(query: TripQueryDto) {
        const { page, limit, search } = query
        try{
            const trip = await this.prisma.trip.findMany({
            where: search ? {
                title: {
                    contains: search,
                    mode: "insensitive"
                }
            } : undefined,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                date: 'desc'
            }
        })
        return trip
        }catch(err){
            throw err
        }
    }

    async getOne(id:number) {
        try{    
            const trip = await this.prisma.trip.findUnique({
                where:{
                    id
                }
            })
            return trip
        }catch(err){
            throw err
        }
    }

    async create() {

    }

    async update() {

    }

    async delete() {

    }
}
