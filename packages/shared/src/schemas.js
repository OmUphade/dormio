/**
 * @file schemas.js - Shared Zod validation schemas for Dormio
 */

import { z } from 'zod';
import {
  PropertyKind,
  OrgKind,
  UserRole,
  BookingStatus,
  PaymentStatus,
  InvoiceStatus,
  GateStatus,
  FeatureFlag,
} from './enums.js';

export const PropertyKindSchema = z.nativeEnum(PropertyKind);
export const OrgKindSchema = z.nativeEnum(OrgKind);
export const UserRoleSchema = z.nativeEnum(UserRole);
export const BookingStatusSchema = z.nativeEnum(BookingStatus);
export const PaymentStatusSchema = z.nativeEnum(PaymentStatus);
export const InvoiceStatusSchema = z.nativeEnum(InvoiceStatus);
export const GateStatusSchema = z.nativeEnum(GateStatus);
export const FeatureFlagSchema = z.nativeEnum(FeatureFlag);

/**
 * Money representation: Strict integer paise (1 INR = 100 paise)
 */
export const MoneyPaiseSchema = z
  .number()
  .int('Money must be an integer in paise')
  .nonnegative('Money cannot be negative');

/**
 * Common pagination query parameters
 */
export const PaginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * User Schemas
 */
export const CreateUserSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number format'),
  fullName: z.string().min(2).max(100),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: UserRoleSchema.default(UserRole.SEEKER),
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const UserDtoSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  phone: z.string(),
  fullName: z.string(),
  role: UserRoleSchema,
  createdAt: z.date(),
});

/**
 * Organization Schemas
 */
export const CreateOrgSchema = z.object({
  name: z.string().min(2).max(150),
  kind: OrgKindSchema.default(OrgKind.INDIVIDUAL),
  upiId: z
    .string()
    .regex(/^[\w.-]+@[\w.-]+$/, 'Invalid UPI ID format')
    .optional(),
});

export const OrgDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  kind: OrgKindSchema,
  upiId: z.string().nullable().optional(),
  kycStatus: z.enum(['PENDING', 'VERIFIED', 'REJECTED']).default('PENDING'),
  createdAt: z.date(),
});

/**
 * Property Schemas
 */
export const LocationPointSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const CreatePropertySchema = z.object({
  organizationId: z.string().uuid(),
  name: z.string().min(2).max(150),
  kind: PropertyKindSchema,
  address: z.object({
    line1: z.string(),
    city: z.string(),
    locality: z.string(),
    state: z.string(),
    pincode: z.string().length(6),
  }),
  location: LocationPointSchema,
  features: z.record(z.string(), z.boolean()).default({}),
});

export const PropertyDtoSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  name: z.string(),
  kind: PropertyKindSchema,
  address: z.any(),
  features: z.record(z.string(), z.boolean()),
  createdAt: z.date(),
});

/**
 * Public Listing DTO Validator
 * Strictly exposes only non-PII, public-facing fields (ADR-14)
 */
export const ListingPublicDtoSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  kind: PropertyKindSchema,
  city: z.string(),
  locality: z.string(),
  minRentPaise: MoneyPaiseSchema,
  ratingAvg: z.number().min(0).max(5).default(0),
  ratingCount: z.number().int().nonnegative().default(0),
  verifiedListing: z.boolean().default(false),
  cctvMonitored: z.boolean().default(false),
  publishedAt: z.date().nullable().optional(),
});
