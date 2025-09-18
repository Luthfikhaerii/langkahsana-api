import { Injectable } from '@nestjs/common';
import { TripQueryDto } from './dto/trip-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TripCreateDto } from './dto/trip-create.dto';
import { TripUpdateDto } from './dto/trip-update.dto';

@Injectable()
export class TripService {
    constructor(private prisma: PrismaService) { }

    async getAll(query: TripQueryDto) {
        const { page, limit, search } = query
        try {
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
        } catch (err) {
            throw err
        }
    }

    async getOne(id: number) {
        try {
            const trip = await this.prisma.trip.findUnique({
                where: {
                    id
                }
            })
            return trip
        } catch (err) {
            throw err
        }
    }

    async create(dto: TripCreateDto) {
        const { title, date, price, location, kuota, image, meet_point, contents, participants } = dto
        try {
            const trip = await this.prisma.trip.create({
                data: {
                    title, date, price, location, kuota, image, meet_point,
                    contents: {
                        create: contents.map(v => ({
                            content: v.content
                        }))
                    },
                    participants: {
                        create: participants.map(v => ({
                            name: v.name,
                            no_whatsapp: v.no_whatsapp,
                            no_darurat: v.no_darurat,
                            address: v.address,
                            meet_point: v.meet_point,
                            payment_proof: v.payment_proof
                        }))
                    }

                }
            })
            return trip
        } catch (err) {
            throw err
        }
    }

    async update(id: number, dto: TripUpdateDto) {
        const { title, date, price, location, kuota, image, meet_point, contents, participants } = dto
        try {
            const trip = await this.prisma.trip.update({
                where: {
                    id
                },
                data: {
                    title, date, price, location, kuota, image, meet_point,
                    contents: {
                        set: [],
                        create: contents.map(v => ({
                            content: v.content
                        })),
                    },
                    participants: {
                        set: [],
                        create: participants.map(v => ({
                            name: v.name,
                            no_whatsapp: v.no_whatsapp,
                            no_darurat: v.no_darurat,
                            address: v.address,
                            meet_point: v.meet_point,
                            payment_proof: v.payment_proof
                        }))
                    }
                }
            })
            return trip
        } catch (err) {
            throw err
        }
    }

    async delete(id:number) {
        try{
            await this.prisma.trip.delete({
                where:{
                    id
                }
            })
        }catch(err){
            throw err
        }
    }
}
