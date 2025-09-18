import { IsDate, IsString } from 'class-validator'

class ArticleContentCreateDto{
    @IsString()
    content:string
}

export class ArticleCreateDto{
    @IsString()
    title: string
    @IsDate()
    date: Date
    @IsString() 
    description: string
    @IsString()
    image: string
    contents: ArticleContentCreateDto[]
}