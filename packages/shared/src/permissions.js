/**
 * @file permissions.js - Permission matrix & actions for Dormio authorization
 */

import { UserRole } from './enums.js';

export const Actions = {
  MANAGE: 'manage',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
};

export const Subjects = {
  ALL: 'all',
  USER: 'User',
  ORG: 'Organization',
  PROPERTY: 'Property',
  LISTING: 'Listing',
  BOOKING: 'Booking',
  PAYMENT: 'Payment',
  COMPLAINT: 'Complaint',
  GATE: 'Gate',
  MESS: 'Mess',
};

/**
 * Base static permission matrix by UserRole
 */
export const PermissionRules = {
  [UserRole.PLATFORM_ADMIN]: [{ action: Actions.MANAGE, subject: Subjects.ALL }],
  [UserRole.ORG_OWNER]: [
    { action: Actions.MANAGE, subject: Subjects.ORG },
    { action: Actions.MANAGE, subject: Subjects.PROPERTY },
    { action: Actions.MANAGE, subject: Subjects.LISTING },
    { action: Actions.READ, subject: Subjects.BOOKING },
    { action: Actions.UPDATE, subject: Subjects.BOOKING },
    { action: Actions.MANAGE, subject: Subjects.PAYMENT },
  ],
  [UserRole.PROPERTY_MANAGER]: [
    { action: Actions.MANAGE, subject: Subjects.PROPERTY },
    { action: Actions.MANAGE, subject: Subjects.BOOKING },
    { action: Actions.MANAGE, subject: Subjects.COMPLAINT },
    { action: Actions.READ, subject: Subjects.PAYMENT },
    { action: Actions.UPDATE, subject: Subjects.PAYMENT },
  ],
  [UserRole.WARDEN]: [
    { action: Actions.READ, subject: Subjects.PROPERTY },
    { action: Actions.MANAGE, subject: Subjects.GATE },
    { action: Actions.MANAGE, subject: Subjects.COMPLAINT },
    { action: Actions.READ, subject: Subjects.BOOKING },
  ],
  [UserRole.GUARD]: [
    { action: Actions.READ, subject: Subjects.GATE },
    { action: Actions.CREATE, subject: Subjects.GATE },
    { action: Actions.UPDATE, subject: Subjects.GATE },
  ],
  [UserRole.RESIDENT]: [
    { action: Actions.READ, subject: Subjects.PROPERTY },
    { action: Actions.CREATE, subject: Subjects.COMPLAINT },
    { action: Actions.READ, subject: Subjects.COMPLAINT },
    { action: Actions.READ, subject: Subjects.PAYMENT },
    { action: Actions.READ, subject: Subjects.MESS },
  ],
  [UserRole.SEEKER]: [
    { action: Actions.READ, subject: Subjects.LISTING },
    { action: Actions.CREATE, subject: Subjects.BOOKING },
    { action: Actions.READ, subject: Subjects.BOOKING },
  ],
};
