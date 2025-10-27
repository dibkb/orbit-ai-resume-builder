"use client";

import { Button } from "@/components/ui/button";
import { geistMono, geistSans } from "@/lib/fonts";
import { ChartNoAxesColumn, Eye, Clock10 } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
const tabs = [
  {
    label: "Analytics",
    value: "analytics",
    icon: <ChartNoAxesColumn className="size-4" />,
  },
  {
    label: "Resume Preview",
    value: "resume-preview",
    icon: <Eye className="size-4" />,
  },
  {
    label: "Edit History",
    value: "edit-history",
    icon: <Clock10 className="size-4" />,
  },
];
export default function Dashboard() {
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsString.withDefault("analytics")
  );
  return (
    <div
      className={`container mx-auto p-4 max-w-7xl ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <div className="grid grid-cols-3 border w-full rounded-lg p-1">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            variant="ghost"
            onClick={() => setTab(tab.value)}
            className="w-full font-medium"
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
