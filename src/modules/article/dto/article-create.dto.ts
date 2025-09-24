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
    @ValidateNested({ each: true }) // ✅ untuk validasi array of object
    @Type(() => ArticleContentCreateDto) // ✅ agar nested DTO bisa divalidasi
    contents: ArticleContentCreateDto[]
}