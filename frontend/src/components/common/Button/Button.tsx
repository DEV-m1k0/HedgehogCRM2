import type React from 'react';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

export const Button: React.FC<ButtonProps> = ({ text, className, icon, onClick, disabled = false, type = 'button' }) => {
  return (
    <button
      type={type}
      className={`${className ?? ''} ${styles.button}`}
      onClick={onClick ?? (() => {})}
      disabled={disabled}
    >
      {icon ? icon : null} {text ?? 'Button'}
    </button>
  );
};
