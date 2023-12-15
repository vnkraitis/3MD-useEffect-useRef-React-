import React, { forwardRef } from 'react';

const TextInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input ref={ref} {...props} />
  )
);

export default TextInput;
