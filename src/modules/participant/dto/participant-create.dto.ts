import { IsNumber, IsString } from "class-validator"

export class ParticipantCreateDto {
    @IsString()
    name: string
    @IsNumber()
    trip_id: number
    @IsString()
    no_whatsapp: string
    @IsString()
    no_darurat: string
    @IsString()
    address: string
    @IsString()
    meet_point: string
    @IsString()
    payment_proof: string
}