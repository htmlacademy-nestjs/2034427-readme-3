import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import gatewayConfig from "./gateway.config";

const ENV_GATEWAY_FILE_PATH = 'apps/gateway/.gateway.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [gatewayConfig],
      envFilePath: ENV_GATEWAY_FILE_PATH,
    })
  ]
})
export class ConfigGatewayModule {}
