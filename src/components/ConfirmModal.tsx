import { JSX } from "react";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  title: string;
  message: string | JSX.Element;
  confirmText?: string;
  confirmButtonClass?: string;
}

const ConfirmModal = ({
  isOpen = true,
  onClose,
  onCancel,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  confirmButtonClass = 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
}: ConfirmModalProps) => {
  const handleCancel = onCancel || onClose;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{message}</div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`${confirmButtonClass} text-white px-4 py-2 rounded-lg`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;