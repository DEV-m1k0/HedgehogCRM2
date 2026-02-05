import React from 'react';
import { useState } from 'react';
import type { InputProps } from './Input.types';
import styles from './Input.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className = '',
  icon
}) => {
    const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.formGroup}>
      {label ? <label className={`${required ? styles.required : ''}`} htmlFor={name}>{label}</label> : null}
      <div>
        <span className={styles.icon}>{icon ? icon : null}</span>
        <input
            type={type === 'password' ? showPassword ? 'text' : 'password' : type}
            name={name}
            id={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`${styles.formControl} ${error ? styles.invalid : ''} ${className}`}
        />
        {
            type === 'password' &&
            <button 
            type='button' 
            className={`${styles.icon} ${styles.passwordToggleIcon}`}
            onClick={() => setShowPassword(!showPassword)}
            >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
        }
      </div>
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  )
};