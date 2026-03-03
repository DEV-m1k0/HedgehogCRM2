import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './ConfirmDialog.css';

type ConfirmVariant = 'primary' | 'danger';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
}

interface ConfirmState extends ConfirmOptions {
  isOpen: boolean;
}

interface ConfirmDialogContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextValue | null>(null);

const INITIAL_STATE: ConfirmState = {
  isOpen: false,
  title: '',
  message: '',
  confirmText: 'Подтвердить',
  cancelText: 'Отмена',
  variant: 'primary',
};

export const ConfirmDialogProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ConfirmState>(INITIAL_STATE);
  const [resolver, setResolver] = useState<((result: boolean) => void) | null>(null);

  const close = useCallback((result: boolean) => {
    if (resolver) {
      resolver(result);
    }
    setResolver(null);
    setState(INITIAL_STATE);
  }, [resolver]);

  const confirm = useCallback((options: ConfirmOptions) => {
    setState({
      isOpen: true,
      title: options.title ?? 'Подтверждение действия',
      message: options.message,
      confirmText: options.confirmText ?? 'Подтвердить',
      cancelText: options.cancelText ?? 'Отмена',
      variant: options.variant ?? 'primary',
    });
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const value = useMemo(() => ({ confirm }), [confirm]);

  useEffect(() => {
    if (!state.isOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state.isOpen, close]);

  return (
    <ConfirmDialogContext.Provider value={value}>
      {children}
      {state.isOpen && createPortal(
        <div
          className="confirm-overlay"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              close(false);
            }
          }}
        >
          <article className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <header className="confirm-header">
              <h2 id="confirm-title">{state.title}</h2>
            </header>
            <div className="confirm-body">
              <p>{state.message}</p>
            </div>
            <footer className="confirm-actions">
              <button type="button" className="confirm-btn confirm-btn-secondary" onClick={() => close(false)}>
                {state.cancelText}
              </button>
              <button
                type="button"
                className={`confirm-btn ${state.variant === 'danger' ? 'confirm-btn-danger' : 'confirm-btn-primary'}`}
                onClick={() => close(true)}
                autoFocus
              >
                {state.confirmText}
              </button>
            </footer>
          </article>
        </div>,
        document.body,
      )}
    </ConfirmDialogContext.Provider>
  );
};

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error('useConfirmDialog must be used inside ConfirmDialogProvider');
  }
  return context;
};
