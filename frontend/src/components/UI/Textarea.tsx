import { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea = ({ label, className = "", ...props }: Props) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <textarea
        className={`min-h-[120px] w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Textarea;