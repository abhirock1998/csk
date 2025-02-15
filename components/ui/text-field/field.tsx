import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FieldTypes = "input" | "textarea";

interface CommonProps {
  register?: UseFormRegisterReturn;
  error?: string;
  className?: string;
  as?: FieldTypes;
}

type InputProps = CommonProps & React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = CommonProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type BaseProps = InputProps | TextareaProps;

export const Field = ({
  register,
  error,
  as = "input",
  className,
  ...props
}: BaseProps) => {
  return (
    <>
      {as === "input" ? (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          {...(register ? register : {})}
          className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
        />
      ) : (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          {...(register ? register : {})}
          className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none ${className}`}
        />
      )}

      <FieldErrorMessage message={error} />
    </>
  );
};

export const FieldErrorMessage = ({ message }: { message?: string }) => {
  return message && <p className="text-red-500 text-sm">{message}</p>;
};
