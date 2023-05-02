import {registerAs} from "@nestjs/config";
import * as Joi from "joi";

const DEFAULT_PORT = 4000;

export interface GatewayConfig {
  environment: string;
  port: number;
  jwt: {
    accessTokenSecret: string;
    accessTokenExpiresIn: string;
    refreshTokenSecret: string;
    refreshTokenExpiresIn: string;
  }
}

export default registerAs('application', (): GatewayConfig => {
  const config: GatewayConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
    jwt: {
      accessTokenSecret: process.env.JWT_AT_SECRET,
      accessTokenExpiresIn: process.env.JWT_AT_EXPIRES_IN,
      refreshTokenSecret: process.env.JWT_RT_SECRET,
      refreshTokenExpiresIn: process.env.JWT_RT_EXPIRES_IN,
    }
  };

  const validationSchema = Joi.object<GatewayConfig>({
    environment: Joi.string()
      .valid('development', 'production', 'stage'),
    port: Joi.number()
      .port()
      .default(DEFAULT_PORT),
    jwt: Joi.object({
      accessTokenSecret: Joi.string().required(),
      accessTokenExpiresIn: Joi.string().required(),
      refreshTokenSecret: Joi.string().required(),
      refreshTokenExpiresIn: Joi.string().required(),
    })
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Uploader Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
