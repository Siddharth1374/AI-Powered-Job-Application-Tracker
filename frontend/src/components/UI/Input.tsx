import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, className = "", ...props }: Props) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        className={`w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;