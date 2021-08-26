import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
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
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response){
        const { accessToken } = this.jwtAuthService.login(req.user);
        res.cookie('jwt', accessToken);
        return req.user;
        
    }
  
}
