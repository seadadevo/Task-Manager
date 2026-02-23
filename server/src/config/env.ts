import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce
    .number()
    .min(1, "Port must be greater than 0")
    .max(65535, "Port must be less than 65536")
    .default(5000),

   CLIENT_URL: z.string().url("Invalid Client URL format"),

 MONGO_URI: z
    .string()
    .refine(
      (uri) => uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"),
      "Invalid MongoDB URI format"
    ),

 ACCESS_TOKEN_SECRET: z
    .string()
    .min(10, "Access token secret must be at least 10 characters"),

  REFRESH_TOKEN_SECRET: z
    .string()
    .min(10, "Refresh token secret must be at least 10 characters"),

  NODE_ENV: z
    .enum(["development", "production"])
    .default("development"),
});

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env);