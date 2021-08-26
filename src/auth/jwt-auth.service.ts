import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt.strategy";
import { User } from "../users/entities/user.entity";

@Injectable()
export class JwtAuthService{
    constructor(private jwtService: JwtService){}
    login(user:User){
        const payload: JwtPayload = {username: user.username,sub:user.id}
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}