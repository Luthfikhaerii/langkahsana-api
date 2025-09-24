import { Controller, Get, Param, Query, Post, Body, Put, Delete, UseGuards, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleQueryDto } from './dto/article-query.dto';
import { ArticleCreateDto } from './dto/article-create.dto';
import { ArticleUpdateDto } from './dto/article-update.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/auth.decorator';

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
    async getOneArticle(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})) id: number) {
        const data = this.articleService.getOne(id)
        return { data: data, message: "get one article success!" }
    }

    @UseGuards(AuthGuard)
    @Role('admin')
    @Post()
    async createArticle(@Body() body: ArticleCreateDto) {
        console.log(body)
        const data = await this.articleService.create(body)
        return {
            message: "create article success!",
            data
        }
    }

    @UseGuards(AuthGuard)
    @Role('admin')
    @Put(':id')
    async editArticle(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})) id:number,@Body() body:ArticleUpdateDto){
        const data = await this.articleService.update(id,body)
        return {
            message : "update article success!",
            data
        }
    }

    @UseGuards(AuthGuard)
    @Role('admin')
    @Delete(':id')
    async deleteArticle(@Param('id') id:number){
        await this.articleService.delete(id)
        return {
            message : "delete article success!",
        }
    }
}
