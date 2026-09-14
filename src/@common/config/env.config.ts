import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  //Conf ambiente de desenvolvimento
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DEBUG: z.preprocess((val) => val === 'true', z.boolean().default(false)),
  PORT: z.coerce.number().default(3000),

  //Banco de dados
  DB_HOST: z
    .string()
    .default('')
    .refine((val) => val.length > 0, 'DB_HOST é obrigatório'),
  DB_PORT: z.coerce
    .number()
    .or(z.nan())
    .refine(
      (val) => typeof val === 'number' && !isNaN(val),
      'DB_PORT é obrigatório e deve ser um número',
    ),
  DB_NAME: z
    .string()
    .default('')
    .refine((val) => val.length > 0, 'DB_NAME é obrigatório'),
  DB_USER: z
    .string()
    .default('')
    .refine((val) => val.length > 0, 'DB_USER é obrigatório'),
  DB_PASSWORD: z
    .string()
    .default('')
    .refine((val) => val.length > 0, 'DB_PASSWORD é obrigatório'),

  DB_SYNCHRONIZE: z.preprocess((val) => {
    if (typeof val === 'string') {
      return val.toLowerCase() === 'true';
    }
    if (typeof val === 'boolean') {
      return val;
    }
    return false;
  }, z.boolean().default(false)),
  DB_LOG_LEVEL: z.enum(['query', 'error', 'info', 'warn']).default('error'),

  //Autenticação
  JWT_SECRET: z
    .string()
    .default('')
    .refine((val) => val.length > 0, 'JWT_SECRET é obrigatório'),
  JWT_CIPHER_KEY: z
    .string()
    .trim()
    .length(64, 'JWT_CIPHER_KEY deve ter exatamente 64 caracteres hexadecimais')
    .regex(
      /^[0-9a-fA-F]+$/,
      'JWT_CIPHER_KEY deve ser uma string hexadecimal válida',
    ),
  JWT_EXPIRES_IN: z.string().default('1h'),
});

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error(
    'Não será possível inicializar a API - Variáveis de ambiente inválidas:',
  );
  const errors = _env.error.flatten().fieldErrors;
  Object.entries(errors).forEach(([field, messages]) => {
    console.error(`  - [${field}]: ${messages?.join(', ')}`);
  });

  process.exit(1);
}

export const env = _env.data;
