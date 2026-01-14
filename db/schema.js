import { pgTable, serial, varchar, integer, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const registrations = pgTable('registrations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  guests: integer('guests').notNull().default(1),
  message: text('message'),
  registeredAt: timestamp('registered_at').notNull().defaultNow(),
});

// Liste de diffusion - contacts pour les mailings
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  subscribed: boolean('subscribed').notNull().default(true),
  source: varchar('source', { length: 50 }).default('manual'), // 'manual', 'import', 'registration'
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
