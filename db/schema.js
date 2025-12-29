import { pgTable, serial, varchar, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const registrations = pgTable('registrations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  guests: integer('guests').notNull().default(1),
  message: text('message'),
  registeredAt: timestamp('registered_at').notNull().defaultNow(),
});
