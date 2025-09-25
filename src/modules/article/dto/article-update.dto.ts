import { Type } from "class-transformer"
import { IsDate, IsDateString, IsString, ValidateNested } from "class-validator"

class ArticleContentUpdateDto {
    @IsString()
    content: string
    @IsString()
    type:string
}

export class ArticleUpdateDto {
    @IsString()
    title: string
    @IsDateString()
    date: string
    @IsString()
    description: string
    @IsString()
    image: string
    @Type(() => ArticleContentUpdateDto)
    @ValidateNested({ each: true }) 
    contents: ArticleContentUpdateDto[]
}