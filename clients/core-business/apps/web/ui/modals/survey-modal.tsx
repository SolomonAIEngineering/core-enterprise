import { AnimatePresence, motion } from "framer-motion";
import {
    Button,
    Github,
    Google,
    Label,
    LinkedIn,
    Modal,
    ProductHunt,
    RadioGroup,
    RadioGroupItem,
    Twitter,
    Wordmark,
    useMediaQuery,
} from "@dub/ui";
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
    useState,
} from "react";

import { ChevronRight } from "lucide-react";
import { Globe } from "@dub/ui/icons";
import { cn } from "@dub/utils";
import { toast } from "sonner";

const options = [
    {
        value: "twitter",
        label: "Twitter/X",
        icon: Twitter,
    },
    {
        value: "linkedin",
        label: "LinkedIn",
        icon: LinkedIn,
    },
    {
        value: "product-hunt",
        label: "Product Hunt",
        icon: ProductHunt,
    },
    {
        value: "google",
        label: "Google",
        icon: Google,
    },
    {
        value: "github",
        label: "GitHub",
        icon: Github,
    },
    {
        value: "friend",
        label: "Friend/Colleague",
        icon: ({ className }: { className?: string }) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        value: "youtube",
        label: "YouTube",
        icon: ({ className }: { className?: string }) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={className}
            >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    },
    {
        value: "reddit",
        label: "Reddit",
        icon: ({ className }: { className?: string }) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={className}
            >
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
            </svg>
        ),
    },
    {
        value: "indie-hackers",
        label: "Indie Hackers",
        icon: ({ className }: { className?: string }) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={className}
            >
                <path d="M4.604 4.282v15.436h2.625V4.282zm12.167 0v15.436h2.625V4.282zM4.604 19.718h15.436v-2.625H4.604zm0-12.811h15.436V4.282H4.604z" />
            </svg>
        ),
    },
    {
        value: "blog",
        label: "Blog Post",
        icon: ({ className }: { className?: string }) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
    },
    {
        value: "newsletter",
        label: "Newsletter",
        icon: ({ className }: { className?: string }) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
    {
        value: "other",
        label: "Other",
        icon: Globe,
    },
];

const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 0.4 },
    },
    exit: {
        opacity: 0,
        y: 10,
        transition: { type: "spring", duration: 0.3 },
    },
};

function SurveyModal({
    showSurveyModal,
    setShowSurveyModal,
    onSubmit,
}: {
    showSurveyModal: boolean;
    setShowSurveyModal: Dispatch<SetStateAction<boolean>>;
    onSubmit: (source: string) => void;
}) {
    const { isMobile } = useMediaQuery();
    const [source, setSource] = useState<string | undefined>(undefined);
    const [otherSource, setOtherSource] = useState<string | undefined>(undefined);
    const [submitting, setSubmitting] = useState(false);

    return (
        <Modal showModal={showSurveyModal} setShowModal={setShowSurveyModal}>
            <motion.div
                className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={FADE_IN_VARIANTS}
            >
                <Wordmark className="h-8" />
                <h3 className="text-lg font-medium">Help Us Improve</h3>
                <p className="text-center text-sm text-gray-500">
                    Where did you hear about Vector?
                </p>
            </motion.div>

            <motion.div
                className="bg-gray-50 px-4 py-8 sm:px-16"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={FADE_IN_VARIANTS}
            >
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (!source) return;

                        setSubmitting(true);
                        try {
                            await onSubmit(
                                source === "other" ? otherSource ?? source : source,
                            );
                            toast.success("Thanks for your feedback!", {
                                description: "Your response has been recorded successfully.",
                            });
                            setShowSurveyModal(false);
                        } catch (error) {
                            toast.error("Something went wrong", {
                                description:
                                    "Failed to submit your response. Please try again.",
                            });
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    <RadioGroup
                        name="source"
                        required
                        value={source}
                        onValueChange={(value) => {
                            setSource(value);
                        }}
                        className="grid grid-cols-2 gap-3"
                    >
                        <AnimatePresence mode="wait">
                            {options.map((option, i) => (
                                <motion.div
                                    key={option.value}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div
                                        className={cn(
                                            "group flex flex-col rounded-md border border-gray-200 bg-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]",
                                            source === option.value
                                                ? "border-white ring-2 ring-black"
                                                : "hover:border-gray-500 hover:ring-1 hover:ring-gray-200 active:ring-2",
                                        )}
                                    >
                                        <RadioGroupItem
                                            value={option.value}
                                            id={option.value}
                                            className="hidden"
                                        />
                                        <Label
                                            htmlFor={option.value}
                                            className="flex h-full cursor-pointer select-none items-center gap-2 px-4 py-3 text-gray-600"
                                        >
                                            <option.icon
                                                className={cn(
                                                    "h-5 w-5 transition-all duration-200 group-hover:scale-110 group-hover:grayscale-0",
                                                    {
                                                        grayscale: source !== option.value,
                                                        "h-4 w-4": option.value === "twitter",
                                                        "text-gray-600": option.value === "other",
                                                    },
                                                )}
                                            />
                                            <p className="text-sm font-medium">{option.label}</p>
                                            {option.value === "other" && (
                                                <div className="flex grow justify-end">
                                                    <ChevronRight
                                                        className={cn(
                                                            "h-4 w-4 transition-transform duration-200",
                                                            source === option.value && "rotate-90",
                                                        )}
                                                    />
                                                </div>
                                            )}
                                        </Label>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </RadioGroup>

                    <AnimatePresence mode="wait">
                        {source === "other" && (
                            <motion.div
                                className="mt-4"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <label>
                                    <div className="flex rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            required
                                            maxLength={32}
                                            autoFocus={!isMobile}
                                            autoComplete="off"
                                            className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                                            placeholder="Reddit, Indie Hackers, etc."
                                            value={otherSource}
                                            onChange={(e) => setOtherSource(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {source !== undefined && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Button
                                    className="mt-4 w-full transition-all duration-200 hover:scale-[1.02]"
                                    variant="primary"
                                    type="submit"
                                    text={submitting ? "Submitting..." : "Submit"}
                                    loading={submitting}
                                    disabled={
                                        !source.length || (source === "other" && !otherSource)
                                    }
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </motion.div>
        </Modal>
    );
}

export function useSurveyModal() {
    const [showSurveyModal, setShowSurveyModal] = useState(false);

    const SurveyModalCallback = useCallback(
        ({ onSubmit }: { onSubmit: (source: string) => void }) => {
            return (
                <SurveyModal
                    showSurveyModal={showSurveyModal}
                    setShowSurveyModal={setShowSurveyModal}
                    onSubmit={onSubmit}
                />
            );
        },
        [showSurveyModal, setShowSurveyModal],
    );

    return useMemo(
        () => ({
            setShowSurveyModal,
            SurveyModal: SurveyModalCallback,
        }),
        [setShowSurveyModal, SurveyModalCallback],
    );
}