import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  className?: string; // For additional styling on the select itself
  labelClassName?: string; // For additional styling on the label
  containerClassName?: string; // For additional styling on the div container
  defaultOptionLabel?: string; // Label for the default, unselected option
}

const Select = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  required = false,
  className = '',
  labelClassName = '',
  containerClassName = '',
  defaultOptionLabel = 'Select an option',
  ...rest
}: SelectProps) => {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className={`block text-sm font-medium text-gray-300 mb-2 ${labelClassName}`}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${className}`}
        {...rest}
      >
        <option value="" disabled>{defaultOptionLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
