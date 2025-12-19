
import React from "react";

type SupplyZone = "green" | "yellow" | "red" | "teal" | "purple";

interface ActivityBadgeProps {
  zone: SupplyZone;
  label: string;
}

const zoneStyles: Record<SupplyZone, string> = {
  teal: "bg-teal-500/10 text-[#19F6FF] border border-[#00BCC9]",
  green: "bg-emerald-500/10 text-[#22C55E] border border-[#22C55E]/70",
  yellow: "bg-yellow-400/10 text-[#F4D03F] border border-[#F4D03F]/70",
  red: "bg-red-500/10 text-[#FF4D4D] border border-[#FF4D4D]/80",
  purple: "bg-purple-500/10 text-[#A855F7] border border-[#A855F7]/70"
};

/**
 * ActivityBadge
 * -------------
 * Brand-aligned status badge for Activity table.
 *
 * Color rules:
 * - teal   → stable/healthy baseline
 * - green  → improving / strong positive
 * - yellow → watch / neutral-concern
 * - red    → declining / risk / stress
 * - purple → AI / experimental / additive insight
 */
export const ActivityBadge: React.FC<ActivityBadgeProps> = ({ zone, label }) => {
  return (
    <span
      className={
        "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide " +
        zoneStyles[zone]
      }
    >
      {label}
    </span>
  );
};
