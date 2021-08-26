import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleModule } from './auth/google/google.module';
import { JwtAuthModule } from './auth/jwt-auth.module';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity';

@Module({
  imports: [ 
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false }
            : false,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal:true
  }),
    GoogleModule,JwtAuthModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
