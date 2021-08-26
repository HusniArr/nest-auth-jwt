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
            clientID:configService.get<string>('OAUTH_CLIENT_ID'),
            clientSecret:configService.get<string>('OAUTH_CLIENT_SECRET'),
            callbackURL:configService.get<string>('OAUTH_REDIRECT_URL'),
            passReqToCallback:true,
            scope:['email','profile']
        })
    }
    
    
      async validate(accessToken:string,refreshToken:string,profile:Profile){
      
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