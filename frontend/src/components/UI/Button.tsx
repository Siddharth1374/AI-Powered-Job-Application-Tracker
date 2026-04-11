import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

const Button = ({ children, fullWidth, className = "", ...props }: PropsWithChildren<Props>) => {
  return (
    <button
      className={`rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;