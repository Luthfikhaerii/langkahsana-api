import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class ArticleQueryDto {
    @Type(()=>Number)
    @IsNumber()
    page: number = 1
    @Type(()=>Number)
    @IsNumber()
    limit: number = 12
    @IsOptional()
    @IsString()
    search?: string
}