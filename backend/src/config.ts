import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

loadEnv({ path: '.env' });

const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  PORT: z.coerce.number().int().positive().default(4000),
  HOST: z.string().default('0.0.0.0'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  ADMIN_API_KEY: z.string().min(16),
});

export const config = envSchema.parse({
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  ADMIN_API_KEY: process.env.ADMIN_API_KEY,
});
