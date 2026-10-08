import { pgTable, uuid, text, jsonb, timestamp, geometry } from 'drizzle-orm/pg-core';
import { organizations } from './orgs.js';

export const properties = pgTable('properties', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id')
    .references(() => organizations.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  kind: text('kind').notNull(), // HOSTEL, PG, MESS
  address: jsonb('address').notNull(), // { line1, city, locality, state, pincode }
  location: geometry('location', { type: 'point', mode: 'xy', srid: 4326 }),
  features: jsonb('features').default({}).notNull(), // { cctv, mess_link, visitors, outpass, reviews }
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
