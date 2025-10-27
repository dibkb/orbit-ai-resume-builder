"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BadgeCheckIcon } from "lucide-react";

const VerifiedBadge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Badge variant="secondary" className={cn("", className)}>
      <BadgeCheckIcon />
      {children}
    </Badge>
  );
};

export default VerifiedBadge;
