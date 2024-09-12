import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
  id: serial('id').unique().primaryKey(),
  imageUrl: text('image_url').notNull(),
  stock: integer('stock').default(0),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
});
