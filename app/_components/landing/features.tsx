import React from "react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
const Feature = ({ title, description, icon }: FeatureProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full">{icon}</div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default Feature;
