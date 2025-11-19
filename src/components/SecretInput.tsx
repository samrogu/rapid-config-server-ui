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
}

const SecretInput = ({ id, name, placeholder, value, onChange, required = false, className = '', label = '' }: SecretInputProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={isRevealed ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        label={label}
        className={`pr-10 ${className}`} // Add padding-right for the eye icon
      />
      <button
        type="button"
        onClick={() => setIsRevealed(!isRevealed)}
        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
      >
        {isRevealed ? (
          <EyeSlashIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default SecretInput;