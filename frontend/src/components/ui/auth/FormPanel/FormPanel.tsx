'use client';

import React, { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import { Input } from '@components/common/Input/Input';
import { CheckBoxInput } from '@components/common/Input/CheckBoxInput';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './FormPanel.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import type { FormPanelProps } from './FormPanel.types';

const getInputValue = (formValues: object, fieldName: string): string | number => {
  const values = formValues as Record<string, unknown>;
  const value = values[fieldName];
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }
  return '';
};

export const FormPanel: React.FC<FormPanelProps> = ({
  link,
  h1Text,
  pText,
  fields,
  type,
  buttonText,
  onChangeField,
  onSubmitForm,
  formValues,
  canSubmit = true,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={`${styles.panel} ${styles.formPanel}`}>
      <h1>{h1Text}</h1>
      <p>{pText}</p>
      <form onSubmit={onSubmitForm}>
        {type === 'login' ? (
          <>
            {fields.map((field, index) => (
              <Input
                key={index}
                type={field.type}
                name={field.name}
                id={field.id}
                value={getInputValue(formValues, field.name)}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                onChangeField={onChangeField}
                icon={field.icon}
                pattern={field.pattern}
              />
            ))}
            <CheckBoxInput
              name="rememberMe"
              label="Запомнить меня"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className={styles.rememberMe}
            />
          </>
        ) : (
          <>
            <div className={styles.tripleInput}>
              {fields.slice(0, 3).map((field, index) => (
                <Input
                  key={index}
                  type={field.type}
                  name={field.name}
                  id={field.id}
                  value={getInputValue(formValues, field.name)}
                  label={field.label}
                  placeholder={field.placeholder}
                  onChangeField={onChangeField}
                  required={field.required}
                  icon={field.icon}
                  pattern={field.pattern}
                />
              ))}
            </div>
            {fields.slice(3).map((field, index) => (
              <Input
                key={index}
                type={field.type}
                name={field.name}
                id={field.id}
                value={getInputValue(formValues, field.name)}
                onChangeField={onChangeField}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                icon={field.icon}
                pattern={field.pattern}
              />
            ))}
          </>
        )}
        <Button
          text={buttonText}
          type="submit"
          icon={<FontAwesomeIcon icon={faSignInAlt} />}
          className={styles.loginButton}
          disabled={!canSubmit}
        />
      </form>
      <p className={styles.switchPage}>
        {link.pText} <Link href={link.pathname}>{link.linkText}</Link>
      </p>
    </div>
  );
};
