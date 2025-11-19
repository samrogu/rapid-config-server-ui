import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // For additional styling on the input itself
  labelClassName?: string; // For additional styling on the label
  containerClassName?: string; // For additional styling on the div container
}

const Checkbox = ({
  label,
  id,
  name,
  checked,
  onChange,
  className = '',
  labelClassName = '',
  containerClassName = '',
  ...rest
}: CheckboxProps) => {
  return (
    <div className={`flex items-center ${containerClassName}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className={`mr-2 ${className}`}
        {...rest}
      />
      <label htmlFor={id} className={`text-gray-300 ${labelClassName}`}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
