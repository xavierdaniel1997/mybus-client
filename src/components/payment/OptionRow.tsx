import { ReactNode } from "react";

interface OptionRowProps {
  icon: ReactNode;
  title: string;
  checked: boolean;
  onClick: () => void;
}

export default function OptionRow({ icon, title, checked, onClick }: OptionRowProps) {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center p-4 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{title}</span>
      </div>

      {/* Radio button */}
      <div
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
          checked ? "border-blue-600" : "border-gray-400"
        }`}
      >
        {checked && <div className="h-2.5 w-2.5 bg-blue-600 rounded-full"></div>}
      </div>
    </div>
  );
}
