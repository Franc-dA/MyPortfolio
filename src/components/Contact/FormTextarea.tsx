import React from 'react';

interface FormTextareaProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function FormTextarea({
  id,
  label,
  value,
  error,
  disabled,
  onChange
}: FormTextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-400 mb-2">{label}</label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={4}
        className={`w-full px-4 py-2 bg-gray-900 border rounded-lg focus:outline-none focus:border-orange-500 text-white transition-colors ${
          error ? 'border-red-500' : 'border-gray-800'
        }`}
        placeholder={`Scrivi qui il tuo ${label.toLowerCase()}`}
      ></textarea>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}