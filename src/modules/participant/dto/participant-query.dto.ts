import { IsNumber } from "class-validator"

export class ParticipantQueryDto {
    @IsNumber()
    page:number
    @IsNumber()
    limit:number
}