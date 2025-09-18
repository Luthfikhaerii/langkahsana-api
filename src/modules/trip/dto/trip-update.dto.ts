class TripParticipantUpdateDto {
    name: string
    no_whatsapp: string
    no_darurat: string
    address: string
    meet_point: string
    payment_proof: string
}

class TripContentUpdateDto {
    content: string
}

export class TripUpdateDto {
  title:string     
  date:Date
  location:string  
  meet_point:string 
  kuota:number     
  price:number     
  image:string
  contents:TripContentUpdateDto[]
  participants:TripParticipantUpdateDto[]     
}