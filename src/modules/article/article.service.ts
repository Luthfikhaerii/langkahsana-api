import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleCreateDto } from './dto/article-create.dto';
import { ArticleUpdateDto } from './dto/article-update.dto';

@Injectable()
export class ArticleService {
    constructor(private readonly prisma: PrismaService) { }

    async getAll(query: { page: number, limit: number, search?: string }) {
        const { page, limit, search } = query
        try {
            const data = await this.prisma.article.findMany({
                where: search ? {
                    title: {
                        contains: search,
                        mode: 'insensitive'
                    }
                } : undefined,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                }
            })
            return data
        } catch (err) {
            throw err
        }
    }

    async getOne(id: number) {
        try {
            const data = await this.prisma.article.findUnique({ where: { id } })
            return data
        } catch (err) {
            throw err
        }
    }

    async create(dto: ArticleCreateDto) {
        try {
            const article = await this.prisma.article.create({
                data: {
                    title: dto.title,
                    date: dto.date,
                    description: dto.description,
                    image: dto.image,
                    contents: {
                        create: dto.contents.map(v => ({
                            content: v.content
                        }))
                    }
                },
                include: {
                    contents: true
                }
            })
            return article
        } catch (err) {
            throw err
        }
    }

    async update(id: number, dto: ArticleUpdateDto) {
        try {
            const newArticle = await this.prisma.article.update({
                where: {
                    id
                },
                data: {
                    title: dto.title,
                    date: dto.date,
                    description: dto.description,
                    image: dto.image,
                    contents: {
                        set: [],
                        create: dto.contents.map(v => ({
                            content: v.content
                        }))
                    }
                }
            })
            return newArticle
        } catch (err) {
            throw err
        }
    }

    async delete(id: number) {
        try {
            await this.prisma.article.delete({
                where: {
                    id
                }
            })
        } catch (err) {
            throw err
        }
    }
}
