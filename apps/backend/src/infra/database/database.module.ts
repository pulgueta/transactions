import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schemas';

export const databaseModule = Symbol('DatabaseModule');

@Module({
  providers: [
    {
      provide: databaseModule,
      inject: [ConfigService],
      useFactory: async (cfg: ConfigService) => {
        const databaseUrl = cfg.get<string>('DATABASE_URL');

        const client = new Pool({
          connectionString: databaseUrl,
          ssl: process.env.NODE_ENV === 'production',
        });

        return drizzle(client, { logger: true, schema }) as NodePgDatabase<
          typeof schema
        >;
      },
    },
  ],
  exports: [databaseModule],
})
export class DatabaseModule {}
