import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {ConfigAccountsModule, getMongooseOptions} from '@project/config/config-accounts';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigAccountsModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
