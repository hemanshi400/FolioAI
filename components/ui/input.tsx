'use client';

import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`input ${className}`}
      {...props}
    />
  )
);
Input.displayName = 'Input';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`input resize-none ${className}`}
      {...props}
    />
  )
);
TextArea.displayName = 'TextArea';

export { Input, TextArea };
