import { Module } from '@nestjs/common';
import { ConfigAccountsModule } from '@project/config/config-accounts';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NotifyModule } from './notify/notify.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigAccountsModule,
    MongooseModule.forRootAsync(getMongooseOptions('db')),
    NotifyModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
