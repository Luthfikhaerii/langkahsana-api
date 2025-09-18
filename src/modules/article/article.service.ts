import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleCreateDto } from './dto/article-create.dto';

@Injectable()
export class ArticleService {
    constructor(private readonly prisma:PrismaService){}

    async getAll(query:{page:number,limit:number,search?:string}){
        const {page,limit,search} = query
        const data = await this.prisma.article.findMany({
            where:search? {
                title:{
                    contains: search,
                    mode:'insensitive'
                }
            }:undefined,
            skip:(page-1)*limit,
            take:limit,
            orderBy: { 
            }
        })
        return data
    }

    async getOne(id: number){
        const data = await this.prisma.article.findUnique({where:{id}})
        return data
    }

    async create(dto:ArticleCreateDto){
        const article = await this.prisma.article.create({
            data:{
                title:dto.title,
                date:dto.date,
                description:dto.description,
                image:dto.image,
                contents: {
                    create : dto.contents.map(v=>({
                        content:v.content
                    }))
                }
            },
            include: {
                contents:true
            }
        })
        return article

    }
}
