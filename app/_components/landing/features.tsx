import { cn } from "@/lib/utils";
import React from "react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}
const Feature = ({ title, description, icon, className }: FeatureProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border px-4 py-8 rounded-md border-zinc-100">
      <div
        className={cn(
          "flex items-center justify-center h-10 w-10 rounded-md",
          className
        )}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold bg-linear-to-r from-zinc-800 to-neutral-500 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-gray-500 text-center text-sm">{description}</p>
    </div>
  );
};

export default Feature;
