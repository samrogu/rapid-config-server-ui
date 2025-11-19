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
  ...rest
}: InputProps) => {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className={`block text-sm font-medium text-gray-300 mb-1 ${labelClassName}`}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...rest}
      />
    </div>
  );
};

export default Input;
