import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="font-body text-xs font-medium text-text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      
      <input
        id={id}
        className={`w-full font-body px-4 py-2.5 bg-white text-text-strong text-sm border rounded shadow-sm transition-all duration-200
          focus:outline-none focus:border-2 focus:border-burgundy-700 focus:ring focus:ring-rose-200/50
          disabled:bg-gray-50 disabled:text-gray-400
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-border'}
          ${className}`}
        {...props}
      />

      {error && (
        <p className="font-body text-xs text-red-500 font-medium mt-0.5 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}