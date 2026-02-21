import React, { useState } from 'react';
import type { InputProps } from './Input.types';
import styles from './Input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  id,
  label,
  value,
  onChangeField,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  icon,
  pattern,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.formGroup}>
      {label ? <label className={`${required ? styles.required : ''}`} htmlFor={id ?? name}>{label}</label> : null}
      <div>
        <span className={styles.icon}>{icon ?? null}</span>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          name={name}
          id={id ?? name}
          value={value}
          pattern={pattern}
          onChange={(e) => onChangeField(name, e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`${styles.formControl} ${className}`}
          title="Минимум 8 символов, буква и цифра"
          formNoValidate
        />
        {type === 'password' && (
          <button
            type="button"
            className={`${styles.icon} ${styles.passwordToggleIcon}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>
    </div>
  );
};
