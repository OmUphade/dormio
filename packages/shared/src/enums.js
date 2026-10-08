/**
 * @file enums.js - Shared system enumerations for Dormio
 */

export const PropertyKind = {
  HOSTEL: 'HOSTEL',
  PG: 'PG',
  MESS: 'MESS',
};

export const OrgKind = {
  INDIVIDUAL: 'INDIVIDUAL',
  BUSINESS: 'BUSINESS',
  INSTITUTION: 'INSTITUTION',
};

export const UserRole = {
  PLATFORM_ADMIN: 'PLATFORM_ADMIN',
  ORG_OWNER: 'ORG_OWNER',
  PROPERTY_MANAGER: 'PROPERTY_MANAGER',
  WARDEN: 'WARDEN',
  GUARD: 'GUARD',
  RESIDENT: 'RESIDENT',
  SEEKER: 'SEEKER',
};

export const BookingStatus = {
  REQUESTED: 'REQUESTED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
};

export const PaymentStatus = {
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  PAID: 'PAID',
  REJECTED: 'REJECTED',
  REFUNDED: 'REFUNDED',
};

export const InvoiceStatus = {
  DRAFT: 'DRAFT',
  UNPAID: 'UNPAID',
  PAID: 'PAID',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED',
};

export const GateStatus = {
  ALLOWED: 'ALLOWED',
  LATE: 'LATE',
  BLOCKED: 'BLOCKED',
};

export const FeatureFlag = {
  MESS_LINK: 'mess_link',
  CCTV: 'cctv',
  VISITORS: 'visitors',
  OUTPASS: 'outpass',
  REVIEWS: 'reviews',
};
