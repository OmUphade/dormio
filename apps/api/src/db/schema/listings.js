import { pgTable, uuid, text, integer, boolean, timestamp, vector } from 'drizzle-orm/pg-core';
import { properties } from './properties.js';

export const listings = pgTable('listings', {
  id: uuid('id').defaultRandom().primaryKey(),
  propertyId: uuid('property_id')
    .references(() => properties.id, { onDelete: 'cascade' })
    .notNull(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').notNull().default('DRAFT'), // DRAFT, PENDING, PUBLISHED, SUSPENDED
  minRentPaise: integer('min_rent_paise').notNull().default(0),
  ratingAvg: integer('rating_avg').notNull().default(0), // multiplied by 10 or float
  ratingCount: integer('rating_count').notNull().default(0),
  verifiedListing: boolean('verified_listing').notNull().default(false),
  cctvMonitored: boolean('cctv_monitored').notNull().default(false),
  embedding: vector('embedding', { dimensions: 1536 }),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
