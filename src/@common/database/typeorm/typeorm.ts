import { env } from '../../config/env.config';
import { DataSource, LoggerOptions } from 'typeorm';

import { SnakeCaseNamingStrategy } from './snake-case-naming-pattern';
import { User } from '../../entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: Number(env.DB_PORT ?? 5432),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  poolSize: 10,
  /**
   * Só da pra utilizar em ambiente de desenvolvimento
   */
  synchronize: env.DB_SYNCHRONIZE,
  /**
   * export type LogLevel = "query" | "schema" | "error" | "warn" | "info" | "log" | "migration";
   */
  logging: (env.DB_LOG_LEVEL ?? 'error') as LoggerOptions,
  entities: [User],
  namingStrategy: new SnakeCaseNamingStrategy(),
  migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
  invalidWhereValuesBehavior: { undefined: 'ignore', null: 'sql-null' },
});

export async function initDatabase() {
  await AppDataSource.initialize();

  await AppDataSource.runMigrations({
    transaction: 'each',
  });
}
