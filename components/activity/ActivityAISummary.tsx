
import React from "react";

/**
 * ActivityAISummary
 * -----------------
 * AI insight area reserved for TradeMarket AI.
 *
 * For now:
 * - Uses static placeholder insight text.
 * - Uses purple accent to indicate AI-generated content.
 *
 * Later:
 * - Wire to AI Intelligence endpoint, e.g.:
 *   GET /api/ai/activity-insights?role={role}&market={market}
 */
export const ActivityAISummary: React.FC = () => {
  return (
    <div className="mb-4 rounded-2xl border border-purple-500/60 bg-purple-500/10 p-3 shadow-[0_0_18px_rgba(168,85,247,0.4)]">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-purple-200 mb-1">
        Axis AI – Activity Insight
      </div>
      <p className="text-[11px] text-purple-50">
        27612 is heating up with faster movement and modest price lift, while 27609 is
        slowing slightly. Watch equity-rich owners in 27613 for timed outreach.
      </p>
      <p className="mt-1 text-[10px] text-purple-200/80">
        {/* TODO: connect to AI insights endpoint when Intelligence Layer is live. */}
      </p>
    </div>
  );
};
