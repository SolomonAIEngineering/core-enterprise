"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import useUser from "@/lib/swr/use-user";
import { ClientOnly } from "@dub/ui";
import { cn } from "@dub/utils";

/**
 * SurveyButton Component
 *
 * A button component that triggers the user survey modal.
 * Only shows if the user hasn't completed the survey yet.
 *
 * @param {Object} props - Component props
 * @param {(show: boolean) => void} props.setShowSurveyModal - Function to control modal visibility
 *
 * @example
 * ```tsx
 * function SurveySection() {
 *   const [showModal, setShowModal] = useState(false);
 *
 *   return (
 *     <>
 *       <SurveyButton setShowSurveyModal={setShowModal} />
 *       {showModal && <YourSurveyModal />}
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks
 * - Uses Framer Motion for animations
 * - Automatically hides if user has already completed the survey
 * - Responsive design with hover and focus states
 * - Client-side only component
 */
export default function SurveyButton({
  setShowSurveyModal,
}: {
  setShowSurveyModal: (show: boolean) => void;
}) {
  const { user } = useUser();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Check if user has completed survey by checking source field
    if (user && !user.source) {
      setHidden(false);
    }
  }, [user]);

  // Don't show if no user or user has already set their source
  if (!user || user.source || hidden) {
    return null;
  }

  return (
    <ClientOnly>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="px-3 py-2"
        >
          <button
            onClick={() => setShowSurveyModal(true)}
            className={cn(
              "w-full rounded-md p-3 text-left text-sm text-gray-500 transition-colors duration-75",
              "hover:bg-gray-100 hover:text-gray-600 active:bg-gray-200",
              "outline-none focus-visible:ring-2 focus-visible:ring-black/10",
            )}
          >
            Where did you hear about Vector?
          </button>
        </motion.div>
      </AnimatePresence>
    </ClientOnly>
  );
}
