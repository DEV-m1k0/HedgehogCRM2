// ConfirmationModal.tsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ConfirmationModal.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger' | 'success';
  showCloseButton?: boolean;
  disableConfirm?: boolean;
  disableCancel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Подтверждение действия',
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  confirmVariant = 'primary',
  showCloseButton = true,
  disableConfirm = false,
  disableCancel = false,
  size = 'md',
  children,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-container modal-${size}`}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          {showCloseButton && (
            <button className="modal-close-btn" onClick={onClose} aria-label="Закрыть">
              &times;
            </button>
          )}
        </div>

        <div className="modal-content">
          <p className="modal-message">{message}</p>
          {children && <div className="modal-children">{children}</div>}
        </div>

        <div className="modal-footer">
          <button
            className="modal-btn modal-btn-cancel"
            onClick={onClose}
            disabled={disableCancel}
          >
            {cancelText}
          </button>
          <button
            className={`modal-btn modal-btn-confirm modal-btn-${confirmVariant}`}
            onClick={handleConfirm}
            disabled={disableConfirm}
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;