import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService){}

    generateToken(user:{email:string,role:string}){
        const payload = {email:user.email,role:user.role}
        return this.jwtService.sign(payload)
    }

    verifyToken(token:string){
        try{
            const payload = this.jwtService.verify(token)
            return payload
        }catch{
            return null
        }
    }
}
