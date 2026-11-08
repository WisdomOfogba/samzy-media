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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-zinc-900/90 border border-white/10 p-6 md:p-8 space-y-4 rounded-3xl shadow-2xl shadow-purple-950/40">
        <h2 className="text-xl font-bold text-white font-heading">
          {title}
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors rounded-full"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 transition-colors rounded-full shadow-lg shadow-red-950/50 disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
