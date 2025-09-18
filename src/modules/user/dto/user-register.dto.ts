import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UserRegisterDto {
    @IsEmail()
    email: string
    @IsNotEmpty()
    password: string
    @IsString()
    role: string
}