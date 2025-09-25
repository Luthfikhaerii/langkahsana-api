import { Type } from 'class-transformer'
import { IsDate, IsDateString, IsString, ValidateNested } from 'class-validator'

class ArticleContentCreateDto {
    @IsString()
    content: string
    @IsString()
    type: string
}

export class ArticleCreateDto {
    @IsString()
    title: string
    @IsDateString()
    date: string
    @IsString()
    description: string
    @IsString()
    image: string
    @ValidateNested({ each: true }) 
    @Type(() => ArticleContentCreateDto) 
    contents: ArticleContentCreateDto[]
}