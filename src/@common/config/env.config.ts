import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  //Conf ambiente de desenvolvimento
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DEBUG: z.preprocess((val) => val === 'true', z.boolean().default(false)),
  PORT: z.coerce.number().default(3000),

  //Banco de dados
  DB_HOST: z.string().min(1, 'DB_HOST é obrigatório'),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string().min(1, 'DB_NAME é obrigatório'),
  DB_USER: z.string().min(1, 'DB_USER é obrigatório'),
  DB_PASSWORD: z.string().default('DB_PASSWORD é obrigatório'),
  DB_SYNCRONIZE: z.preprocess((val) => val === 'true', z.boolean().default(false)),
  DB_LOG_LEVEL: z.enum(['query', 'error', 'info', 'warn']).default('error'),

  //Autenticação
  JWT_SECRET: z.string().min(1, 'JWT_SECRET é obrigatório'),
  JWT_CIPHER_KEY: z.string().min(1, 'JWT_CIPHER_KEY é obrigatório'),
  JWT_EXPIRES_IN: z.string().default('1h'),
});

// Valida os dados imediatamente ao importar o arquivo
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Erro crítico: Variáveis de ambiente inválidas:');
  const errors = _env.error.flatten().fieldErrors;
  Object.entries(errors).forEach(([field, messages]) => {
    console.error(`  - [${field}]: ${messages?.join(', ')}`);
  });
  
  process.exit(1); 
}

export const env = _env.data;