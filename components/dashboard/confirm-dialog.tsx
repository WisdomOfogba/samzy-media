"use client";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 p-6 space-y-4 rounded-none shadow-2xl">
        <h2 className="text-base font-bold font-mono uppercase tracking-wider text-white">
          {title}
        </h2>
        <p className="text-xs font-mono text-zinc-400 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-2.5 justify-end pt-2 border-t border-zinc-800">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors rounded-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors rounded-none border border-red-500 disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
