import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,Profile } from "passport-google-oauth20"
import { UsersService } from "../../users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(
        configService:ConfigService,
        private readonly usersService:UsersService
        ){
        super({
            clientID:'185678360087-0b57h2g6vh0ollm42qa85gs6id9p5lgh.apps.googleusercontent.com',
            clientSecret:'hdT-GN75-ssP_tN3Et0iSXuN',
            callbackURL:'http://localhost:5000/auth/google/redirect',
            passReqToCallback:true,
            scope:['email','profile']
        })
    }
    
    
      async validate(_accessToken:string,_refreshToken:string,profile:Profile){
      
          const {  id,name, emails } = profile;
          let user = await this.usersService.findOneByProvider('google',id);
          if(!user){
              user = await this.usersService.create({
                  provider:'google',
                  provider_id:id,
                  username:name.givenName,
                  email:emails[0].value,
              });
          }
        return user;
      }

}