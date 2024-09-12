import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { createId } from '@paralleldrive/cuid2';

import { usersTable } from './user';
import { productsTable } from './product';

export const ordersTable = pgTable('orders', {
  id: text('id')
    .unique()
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .references(() => usersTable.id)
    .notNull(),
  orderTotal: integer('order_total').notNull(),
  products: text('products')
    .array()
    .$type<string[]>()
    .references(() => productsTable.id)
    .notNull(),
  last4Digits: text('last_4_digits').notNull(),
  status: text('status', { enum: ['PENDING', 'FAILED', 'SUCCESS'] }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
});
