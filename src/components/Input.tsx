import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string; // For additional styling on the input itself
  labelClassName?: string; // For additional styling on the label
  containerClassName?: string; // For additional styling on the div container
  rightElement?: React.ReactNode;
}

const Input = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  labelClassName = '',
  containerClassName = '',
  rightElement,
  ...rest
}: InputProps) => {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className={`block text-sm font-medium text-gray-300 mb-2 ${labelClassName}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${rightElement ? 'pr-10' : ''} ${className}`}
          {...rest}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
