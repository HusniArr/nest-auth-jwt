import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";
import { JwtConstants } from "./constants";

export type JwtPayload = {sub:number,username:string}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService:ConfigService){
        const extractJwtFromCookie = (req) => {
            let token = null;
            if(req && req.cookies){
                token = req.cookies['jwt'];
            }
            return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        };
        super({
            jwtFromRequest: extractJwtFromCookie,
            ignoreExpiration:false,
            secretOrKey:JwtConstants.secret,
        });
    }
 
    extractJwtFromCookie(req){
        let token= null;
        if(req && req.cookies){
            token = req.cookies['jwt']
        }
        return token;
    }
    
      async validate(payload: JwtPayload) {
          try{
              return { id: payload.sub, username: payload.username };

          }catch(err){
            throw new UnauthorizedException('unauthorized',err.message);
          }
      }
}