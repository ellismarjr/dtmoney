import { forwardRef, ForwardRefRenderFunction } from "react";
import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import { Error } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  name,
  error = null,
  ...rest
}, ref) => {
  return (
    <>
      <input
        name={name}
        id={name}
        ref={ref}
        {...rest}
      />
      {!!error && <Error>{error.message}</Error>}
    </>
  );
}

export const Input = forwardRef(InputBase);