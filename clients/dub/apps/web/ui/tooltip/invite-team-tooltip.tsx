import { Clock, HelpCircle, Shield, Users } from "lucide-react";

import { BusinessConfig as platform } from "@dub/platform-config";
import { Tooltip } from "@dub/ui";
import { Card } from "@dub/ui/ui";
import type React from "react";

/**
 * Props for the InviteTeamTooltip component.
 */
export interface InviteTeamTooltipProps {
  /**
   * Text shown in the tooltip trigger. Defaults to "Why invite team members?".
   */
  question?: string;
  /**
   * React node content displayed inside the tooltip. If not provided,
   * a default explanation of team collaboration will be shown.
   */
  answer?: React.ReactNode;
}

/**
 * A reusable tooltip component that explains the benefits and process of inviting
 * team members to a workspace on the {@link platform.company} platform.
 *
 * This component provides detailed information about:
 * - Role-based access control
 * - Collaboration features
 * - Approval workflows
 * - Activity tracking
 * - Security measures
 *
 * @example
 * ```tsx
 * // Basic usage with default content
 * <InviteTeamTooltip />
 *
 * // Custom trigger question
 * <InviteTeamTooltip question="Learn about team collaboration?" />
 *
 * // Custom answer content
 * <InviteTeamTooltip answer={<CustomContent />} />
 * ```
 *
 * @param props - {@link InviteTeamTooltipProps}
 * @returns A tooltip-trigger element that displays team collaboration information on hover or focus.
 */
export const InviteTeamTooltip: React.FC<InviteTeamTooltipProps> = ({
  question,
  answer,
}) => {
  const questionContent = question ?? "Why invite team members?";
  const answerContent = answer ?? (
    <Card className="min-h-[200px] max-w-lg space-y-3 p-[5%] text-sm">
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            On{" "}
            <span className="text-blue-600 dark:text-blue-400">
              {platform.company}
            </span>
            , team collaboration is essential for effective spend management and
            maintaining financial oversight across your organization.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
        <div className="mb-2 flex items-center gap-2">
          <Shield className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <p className="font-medium text-gray-900 dark:text-gray-100">
            Role-Based Access Control
          </p>
        </div>
        <p className="ml-6 text-gray-700 dark:text-gray-300">
          Assign specific roles to team members:
        </p>
        <ul className="ml-6 mt-1 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
          <li>Admins: Full control over workspace settings and permissions</li>
          <li>Managers: Approve expenses and manage team budgets</li>
          <li>Viewers: View-only access to reports and analytics</li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
        <div className="mb-2 flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <p className="font-medium text-gray-900 dark:text-gray-100">
            Collaboration Features
          </p>
        </div>
        <ul className="ml-6 mt-1 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
          <li>Real-time expense tracking and notifications</li>
          <li>Shared budgets and spending policies</li>
          <li>Team-specific analytics and reporting</li>
          <li>Collaborative receipt management</li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
        <div className="mb-2 flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <p className="font-medium text-gray-900 dark:text-gray-100">
            Invitation Process
          </p>
        </div>
        <ul className="ml-6 mt-1 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
          <li>Instant email invitations with secure links</li>
          <li>Bulk invite support for multiple team members</li>
          <li>Custom welcome messages and onboarding</li>
          <li>Automatic role assignment based on email domain</li>
        </ul>
      </div>
    </Card>
  );

  return (
    <Tooltip content={answerContent}>
      <div className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <span className="border-b border-dotted border-gray-400">
          {questionContent}
        </span>
        <HelpCircle className="h-4 w-4" />
      </div>
    </Tooltip>
  );
};

export default InviteTeamTooltip;
