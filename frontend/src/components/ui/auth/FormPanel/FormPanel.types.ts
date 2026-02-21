import type { FormEvent } from 'react';
import type { InputProps } from '@components/common/Input/Input.types';

export interface FormPanelProps {
  h1Text: string;
  pText: string;
  fields: Omit<InputProps, 'value' | 'onChangeField'>[];
  onChangeField: (name: string, value: string | number) => void;
  onSubmitForm: (event: FormEvent<HTMLFormElement>) => void;
  formValues: object;
  link: LinkProps;
  type: 'login' | 'registration';
  buttonText: string;
  canSubmit?: boolean;
}

export interface LinkProps {
  pText: string;
  pathname: string;
  linkText: string;
}
