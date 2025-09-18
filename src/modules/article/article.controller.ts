import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleQueryDto } from './dto/article-query.dto';
import { ArticleCreateDto } from './dto/article-create.dto';
import { ArticleUpdateDto } from './dto/article-update.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Get()
    async getArticles(@Query() query: ArticleQueryDto) {
        const data = this.articleService.getAll(query)
        return {
            meesage: "get article success!",
            data: data
        }
    }

    @Get(':id')
    async getOneArticle(@Param('id') id: number) {
        const data = this.articleService.getOne(id)
        return { data: data, message: "get one article success!" }
    }

    @Post()
    async createArticle(@Body() dto: ArticleCreateDto) {
        const data = await this.articleService.create(dto)
        return {
            message: "create article success!",
            data
        }
    }

    @Put(':id')
    async editArticle(@Param('id') id:number,@Body() dto:ArticleUpdateDto){
        const data = await this.articleService.update(id,dto)
        return {
            message : "update article success!",
            data
        }
    }

    @Delete(':id')
    async deleteArticle(@Param('id') id:number){
        await this.articleService.delete(id)
        return {
            message : "delete article success!",
        }
    }
}
