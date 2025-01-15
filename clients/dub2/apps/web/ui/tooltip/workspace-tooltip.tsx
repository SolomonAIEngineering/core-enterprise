import { Card } from "@dub/ui/ui";

import { BusinessConfig as platform } from "@dub/platform-config";
import { Tooltip } from "@dub/ui";
import { HelpCircle } from "lucide-react";
import type React from "react";

/**
 * Props for the WorkspaceTooltip component.
 */
export interface WorkspaceTooltipProps {
  /**
   * Text shown in the tooltip trigger. Defaults to "What is a workspace?".
   */
  question?: string;
  /**
   * React node content displayed inside the tooltip. If not provided,
   * a default explanation of the workspace will be shown.
   */
  answer?: React.ReactNode;
}

/**
 * A reusable tooltip component that explains what a workspace is on the
 * {@link platform.company} platform. You can optionally override both the
 * question text and its answer content via props.
 *
 * @param props - {@link WorkspaceTooltipProps}
 * @returns A tooltip-trigger element that displays extra information on hover or focus.
 */
export const WorkspaceTooltip: React.FC<WorkspaceTooltipProps> = ({
  question,
  answer,
}) => {
  const questionContent = question ?? "What is a workspace?";
  const answerContent = answer ?? (
    <Card className="min-h-[200px] max-w-lg space-y-3 p-[5%] text-sm">
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            On{" "}
            <span className="text-blue-600 dark:text-blue-400">
              {platform.company}
            </span>
            , a <span className="italic">Workspace</span> is a dedicated place
            to manage and control your business' spending and expenses.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300">
          Think of it as a <span className="font-semibold">Team</span> or{" "}
          <span className="font-semibold">Organization</span> where you can
          invite your teammates to collaborate and maintain oversight over
          company spending.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300">
          In your workspace, you can:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
          <li>Get a deep insight into your company's spending</li>
          <li>Set and enforce spending limits and policies</li>
          <li>Track real-time expenses across teams</li>
          <li>Streamline expense reporting and approvals</li>
          <li>Access spend analytics and compliance tools</li>
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

export default WorkspaceTooltip;
