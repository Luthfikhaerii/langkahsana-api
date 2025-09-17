import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService){}

    generateToken(user:{email:string,role:string}){
        const payload = {email:user.email,role:user.role}
        return { accessToken: this.jwtService.sign(payload)}
    }

    verifyToken(token:string){
        try{
            return this.jwtService.verify(token)
        }catch{
            return null
        }
    }
}
