import { Knex } from 'knex';

import schema from '../../../services/organisations/schema';
import { logger } from '../../logger';

export async function up(knex: Knex): Promise<void> {
  for (const [tableName, tableSchema] of Object.entries(schema)) {
    await knex.schema.createTable(tableName, tableSchema);

    logger.info(`Created table - ${tableName}`);
  }
}

export async function down(knex: Knex): Promise<void> {
  for (const tableName in schema) {
    await knex.schema.dropTable(tableName);

    logger.info(`Dropped table - ${tableName}`);
  }
}
