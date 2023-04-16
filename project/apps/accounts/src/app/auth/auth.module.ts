import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from '../user/user.module';
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {getJwtOptions} from "@project/config/config-accounts";
import {JwtAccessStrategy} from "./strategies/jwt-access.strategy";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy],
})
export class AuthModule {}
