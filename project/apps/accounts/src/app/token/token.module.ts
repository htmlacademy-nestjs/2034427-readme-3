import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { TokenService } from './token.service';
import {TokenModel, TokenSchema} from './token.model';
import {TokenRepository} from './token.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: TokenModel.name, schema: TokenSchema}
    ])
  ],
  providers: [TokenService, TokenRepository],
  exports: [TokenService]
})
export class TokenModule {}
