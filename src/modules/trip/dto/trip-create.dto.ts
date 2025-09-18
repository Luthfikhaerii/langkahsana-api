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
  title:string     
  date:Date
  location:string  
  meet_point:string 
  kuota:number     
  price:number     
  image:string
  contents:TripContentCreateDto[]
  participants:TripParticipantCreateDto[]     
}