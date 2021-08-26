import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthService } from "./jwt-auth.service";

@Module({
    imports:[
        JwtModule.registerAsync({
            useFactory: async (configService:ConfigService)=>{
                return {
                    secret:JwtConstants.secret,
                    signOptions:{expiresIn:'60s'}
                };
            },
            inject:[ConfigService]
        })
    ],
    providers:[JwtStrategy, JwtAuthService],
    exports:[JwtModule,JwtAuthService],
})

export class JwtAuthModule{}