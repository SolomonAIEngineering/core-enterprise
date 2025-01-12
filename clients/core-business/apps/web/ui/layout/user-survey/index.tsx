"use client";

import { createContext, useState } from "react";

import SurveyButton from "./survey-button";
import { motion } from "framer-motion";
import { mutate } from "swr";
import { useSurveyModal } from "@/ui/modals/survey-modal";
import useUser from "@/lib/swr/use-user";

/**
 * Context for managing the survey submission status
 * @example
 * ```tsx
 * const { status } = useContext(UserSurveyContext);
 * if (status === "loading") {
 *   return <LoadingSpinner />;
 * }
 * ```
 */
export const UserSurveyContext = createContext<{
  status: "loading" | "success" | null;
}>({
  status: null,
});

/**
 * Loading skeleton component for the survey button
 * Shows a pulsing animation while the user data is being fetched
 * @internal
 */
function UserSurveySkeleton() {
  return (
    <motion.div
      className="px-3 py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4/5 animate-pulse rounded-md bg-gray-200" />
      </div>
    </motion.div>
  );
}

/**
 * UserSurvey Component
 *
 * Manages the user survey flow, including:
 * - Showing a survey button in the sidebar
 * - Displaying a modal for survey submission
 * - Handling survey responses
 * - Managing loading states
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 *
 * @example
 * Basic usage:
 * ```tsx
 * function App() {
 *   return (
 *     <UserSurvey>
 *       <YourAppContent />
 *     </UserSurvey>
 *   );
 * }
 * ```
 *
 * Using with context:
 * ```tsx
 * function SurveyStatus() {
 *   const { status } = useContext(UserSurveyContext);
 *
 *   if (status === "loading") {
 *     return <div>Submitting survey...</div>;
 *   }
 *
 *   if (status === "success") {
 *     return <div>Thanks for your feedback!</div>;
 *   }
 *
 *   return null;
 * }
 * ```
 *
 * @remarks
 * - The survey will automatically show after 5 seconds if the user hasn't completed it
 * - The survey response is stored in the user's profile in the database
 * - Uses SWR for data fetching and cache invalidation
 * - Shows a loading skeleton while fetching user data
 */
export default function UserSurvey({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [status, setStatus] = useState<"loading" | "success" | null>(null);
  const { setShowSurveyModal, SurveyModal } = useSurveyModal();
  const { user, loading } = useUser();

  if (loading) {
    return <UserSurveySkeleton />;
  }

  return (
    <UserSurveyContext.Provider value={{ status }}>
      {children}
      <SurveyButton setShowSurveyModal={setShowSurveyModal} />
      <SurveyModal
        onSubmit={async (source) => {
          setStatus("loading");
          try {
            const response = await fetch("/api/user/survey", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ source }),
            });

            if (!response.ok) {
              throw new Error("Failed to submit survey");
            }

            setStatus("success");
            // Mutate the user data to reflect the new source
            await mutate("/api/user");
          } catch (error) {
            setStatus(null);
            throw error; // This will be caught by the modal's error handler
          }
        }}
      />
    </UserSurveyContext.Provider>
  );
}