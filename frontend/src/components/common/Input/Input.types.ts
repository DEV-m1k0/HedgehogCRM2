import type { ReactNode } from 'react';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'time' | 'datetime-local';
  name: string;
  id?: string;
  label?: string;
  value: string | number;
  onChangeField: (name: string, value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  isValid?: boolean;
  className?: string;
  icon?: ReactNode;
  pattern?: string;
}

export interface CheckBoxInputProps {
  name: string;
  className?: string;
  label?: string;
  onChange?: () => void;
  checked?: boolean;
}
