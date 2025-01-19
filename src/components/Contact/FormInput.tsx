import React from 'react';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormInput({
  id,
  label,
  type = 'text',
  value,
  error,
  disabled,
  onChange
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-400 mb-2">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2 bg-gray-900 border rounded-lg focus:outline-none focus:border-orange-500 text-white transition-colors ${
          error ? 'border-red-500' : 'border-gray-800'
        }`}
        placeholder={`Scrivi qui ${label.toLowerCase()}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}