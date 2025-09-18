import { IsNumber, IsString } from "class-validator"

export class ArticleQueryDto {
    @IsNumber()
    page: number = 1
    @IsNumber()
    limit: number = 12
    @IsString()
    search?: string
}