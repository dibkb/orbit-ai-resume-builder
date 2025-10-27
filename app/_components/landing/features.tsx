import React from "react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
const Feature = ({ title, description, icon }: FeatureProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center h-10 w-10 bg-blue-500 rounded-md">
        {icon}
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default Feature;
