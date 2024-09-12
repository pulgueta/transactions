import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { ordersTable } from "./order";

export const usersTable = pgTable("users", {
  id: serial("id").unique().primaryKey(),
  name: text("name").notNull(),
  cardInfo: text("card_info").notNull(),
  address: text("address").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  zip: text("zip").notNull(),
  phoneNum: text("phone_number").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  orders: many(ordersTable),
}));
