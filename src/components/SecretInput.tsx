import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Input from './Input'; // Import the generic Input component

interface SecretInputProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  label?: string;
  containerClassName?: string;
}

const SecretInput = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  label = '',
  containerClassName = ''
}: SecretInputProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <Input
      id={id}
      name={name}
      type={isRevealed ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      label={label}
      className={className}
      containerClassName={containerClassName}
      rightElement={
        <button
          type="button"
          onClick={() => setIsRevealed(!isRevealed)}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          {isRevealed ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      }
    />
  );
};

export default SecretInput;