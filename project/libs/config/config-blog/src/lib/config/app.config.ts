import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3001;

export interface BolgApplicationConfig {
  environment: string;
  port: number;
}

export default registerAs('blog-application', (): BolgApplicationConfig => {
  const config: BolgApplicationConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
  };

  const validationSchema = Joi.object<BolgApplicationConfig>({
    environment: Joi.string().valid('development', 'production', 'stage').required(),
    port: Joi.number().port().default(DEFAULT_PORT),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Blog Application Config]: Environments validation failed. Please check .env file.
      Error message: Mongo.${error.message}`,
    );
  }

  return config;
})
