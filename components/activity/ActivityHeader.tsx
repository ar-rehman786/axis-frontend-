
import React from "react";

/**
 * ActivityHeader
 * --------------
 * Shared header for Activity views in all dashboards.
 */
export const ActivityHeader: React.FC = () => {
  return (
    <header className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-sm font-semibold text-white">Market Activity</h1>
        <p className="text-[11px] text-white/60 max-w-xl">
          Day-to-day movement for your key ZIPs — DOM, price shift, listing velocity, and
          supply pressure, color-coded using Axis brand rules.
        </p>
      </div>
      <div className="flex items-center gap-2 text-[10px] text-white/50">
        <span className="px-2 py-0.5 rounded-full border border-white/15 bg-white/5">
          Powered by Axis TradeMarket AI™
        </span>
      </div>
    </header>
  );
};
