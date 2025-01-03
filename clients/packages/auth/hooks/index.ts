/**
 * @fileoverview Authentication hooks for managing user authentication, authorization, and redirects.
 * 
 * This module provides a collection of React hooks for handling common authentication scenarios:
 * - Route protection and authentication requirements
 * - Role-based access control (RBAC)
 * - Authentication redirects
 * 
 * @example
 * // Import all hooks
 * import { useRequireAuth, useRedirectToSignIn, useAuthGuard } from '@your-org/auth/hooks';
 * 
 * @example
 * // Import individual hooks
 * import { useRequireAuth } from '@your-org/auth/hooks/use-require-auth';
 */

export { useRequireAuth } from './use-require-auth';
export { useRedirectToSignIn } from './use-redirect-to-sign-in';
export { useAuthGuard } from './use-auth-guard';

// Re-export types
export type { AuthGuardOptions } from './use-auth-guard'; 