export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  name: string;
  label?: string;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  icon?: React.ReactNode
}

export interface CheckBoxInputProps {
  name: string
  className?: string
  label?: string
  onChange?: () => void
  checked?: boolean
}