import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/common/types/user';
import {JwtAuthService } from '../jwt-auth.service';
import { GoogleAuthGuard } from './google-auth.guard';


@Controller('auth/google')
export class GoogleController {
    constructor(private jwtAuthService: JwtAuthService){}

    @Get()
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req){

    }
    @Get('redirect')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Req() req  , @Res() res : Response ){
        const { accessToken } = this.jwtAuthService.login(req.user);
        res.cookie('jwt', accessToken);
        const data = req.user;
        res.json({data,accessToken});
        console.log(accessToken);
    }
  
}
