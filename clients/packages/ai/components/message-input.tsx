import { useRef, type FormEvent } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the MessageInput component
 * @interface MessageInputProps
 * @property {(message: string) => void} onSubmit - Callback when message is submitted
 * @property {boolean} [disabled] - Whether the input is disabled
 * @property {string} [placeholder] - Placeholder text for the input
 * @property {string} [className] - Additional CSS classes
 */
type MessageInputProps = {
    onSubmit: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
};

/**
 * Input component for sending messages
 * 
 * @component
 * @example
 * ```tsx
 * <MessageInput 
 *   onSubmit={handleSubmit}
 *   placeholder="Type a message..."
 *   disabled={isLoading}
 * />
 * ```
 * 
 * @description
 * A textarea-based input component with submit button and keyboard
 * shortcuts. Supports auto-expanding height and disabled states.
 */
export const MessageInput = ({
    onSubmit,
    disabled,
    placeholder = 'Type a message...',
    className
}: MessageInputProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const message = textareaRef.current?.value.trim();
        if (!message) return;

        onSubmit(message);
        textareaRef.current.value = '';
        textareaRef.current.style.height = 'auto';
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={twMerge(
                'flex items-end gap-2 border-t bg-background p-4',
                className
            )}
        >
            <textarea
                ref={textareaRef}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className={twMerge(
                    'flex-1 resize-none bg-transparent p-2',
                    'focus:outline-none focus:ring-1 focus:ring-primary',
                    'rounded-md border',
                    'min-h-[2.5rem] max-h-[10rem]'
                )}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
            />
            <button
                type="submit"
                disabled={disabled}
                className={twMerge(
                    'rounded-md bg-primary px-4 py-2 text-primary-foreground',
                    'hover:bg-primary/90',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
            >
                Send
            </button>
        </form>
    );
}; 