"use client";

import { Button } from "@/components/ui/button";
import { geistMono, geistSans } from "@/lib/fonts";
import { ChartNoAxesColumn, Eye, Clock10 } from "lucide-react";
import { useQueryState, parseAsStringEnum } from "nuqs";
import { DashboardTab } from "@/lib/types/nuqs-dashboard";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
const tabs = [
  {
    label: "Analytics",
    value: DashboardTab.Analytics,
    icon: <ChartNoAxesColumn className="size-4" />,
  },
  {
    label: "Resume Preview",
    value: DashboardTab.ResumePreview,
    icon: <Eye className="size-4" />,
  },
  {
    label: "Edit History",
    value: DashboardTab.EditHistory,
    icon: <Clock10 className="size-4" />,
  },
];
export default function Dashboard() {
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsStringEnum<DashboardTab>(Object.values(DashboardTab))
  );

  return (
    <div
      className={`mx-auto p-4 ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full rounded-lg h-full min-h-[calc(100vh-32px)]"
      >
        <ResizablePanel defaultSize={75} className="p-4">
          <div className="grid grid-cols-3 w-full rounded-lg p-1 border border-neutral-100">
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                variant={tab.value === activeTab ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "w-full font-semibold",
                  tab.value === activeTab &&
                    "bg-linear-to-r from-blue-600 to-sky-600",
                  "hover:from-blue-600 hover:to-sky-600"
                )}
              >
                {tab.icon}
                {tab.label}
              </Button>
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-neutral-100" />
        <ResizablePanel defaultSize={25} className="p-2"></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
