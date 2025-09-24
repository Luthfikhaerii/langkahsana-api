import { IsDate, IsString } from "class-validator"

class ArticleContentUpdateDto {
    content: string
    type:string
}

export class ArticleUpdateDto {
    @IsString()
    title: string
    @IsDate()
    date: Date
    @IsString()
    description: string
    @IsString()
    image: string
    contents: ArticleContentUpdateDto[]
}