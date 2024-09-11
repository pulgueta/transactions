import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { createId } from '@paralleldrive/cuid2';

import { usersTable } from './user';
import { ordersTable } from './order';

export const deliveriesTable = pgTable('deliveries', {
  id: text('id')
    .unique()
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .references(() => usersTable.id)
    .notNull(),
  orderId: text('order_id')
    .references(() => ordersTable.id)
    .notNull(),
  status: text('status', { enum: ['PENDING', 'DELIVERED'] }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
});
