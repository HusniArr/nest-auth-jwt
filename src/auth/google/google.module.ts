import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthModule } from '../jwt-auth.module';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports:[
    JwtAuthModule,
    PassportModule,
    UsersModule
  ],
  controllers:[GoogleController],
  providers:[GoogleStrategy],
 
})
export class GoogleModule {}
