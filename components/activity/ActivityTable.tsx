
import React from "react";
import activityData from "@/data/activity.json";
import { ActivityBadge } from "./ActivityBadge";

interface ActivityRow {
  zip: string;
  market: string;
  dom_change: string;
  price_trend: string;
  velocity: string;
  supply_zone: "green" | "yellow" | "red" | "teal" | "purple";
  classification: string;
  signal: string;
}

/**
 * ActivityTable
 * -------------
 * Simple, sortable-style table (sorting can be added later).
 * For now, reads from mock JSON and applies brand color badges.
 *
 * TODO:
 * - Wire to Market Health Engine results instead of JSON.
 * - Add sorting, filtering, and search by ZIP/market.
 */
export const ActivityTable: React.FC = () => {
  const rows = activityData as ActivityRow[];

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black">
      <table className="min-w-full text-left text-xs text-white/70">
        <thead className="border-b border-white/15 bg-white/5">
          <tr>
            <th className="px-3 py-2">ZIP</th>
            <th className="px-3 py-2">Market</th>
            <th className="px-3 py-2">DOM Change</th>
            <th className="px-3 py-2">Price Trend</th>
            <th className="px-3 py-2">Velocity</th>
            <th className="px-3 py-2">Supply Zone</th>
            <th className="px-3 py-2">Classification</th>
            <th className="px-3 py-2">Signal</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.zip} className="border-b border-white/10 hover:bg-white/5">
              <td className="px-3 py-2 text-white/90">{row.zip}</td>
              <td className="px-3 py-2 text-white/70">{row.market}</td>
              <td className="px-3 py-2">{row.dom_change}</td>
              <td className="px-3 py-2">{row.price_trend}</td>
              <td className="px-3 py-2 capitalize">{row.velocity}</td>
              <td className="px-3 py-2">
                <ActivityBadge zone={row.supply_zone} label={row.supply_zone} />
              </td>
              <td className="px-3 py-2 capitalize">{row.classification}</td>
              <td className="px-3 py-2 text-[11px] text-white/60">{row.signal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
