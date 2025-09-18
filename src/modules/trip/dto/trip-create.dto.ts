import { IsDate, IsNumber, IsString } from "class-validator"

class TripParticipantCreateDto {
    
    name: string
    no_whatsapp: string
    no_darurat: string
    address: string
    meet_point: string
    payment_proof: string
}

class TripContentCreateDto {
    content: string
}

export class TripCreateDto {
  @IsString()
  title:string
  @IsDate()     
  date:Date
  @IsString()
  location:string
  @IsString()  
  meet_point:string
  @IsNumber() 
  kuota:number
  @IsNumber()     
  price:number
  @IsString()     
  image:string
  contents:TripContentCreateDto[]
  participants:TripParticipantCreateDto[]     
}