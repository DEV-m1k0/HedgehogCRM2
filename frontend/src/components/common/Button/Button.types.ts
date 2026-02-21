import type React from 'react';

export interface ButtonProps {
  text?: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
