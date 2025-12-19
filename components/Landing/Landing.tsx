import React from 'react';
import ScrollReveal from '@/components/helper functions/ScrollReveal'

export default function LandingPage() {
  return (
    <>
      <div className="" style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>

        {/* Hero Section */}
        <div className="px-8 lg:pr-0 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-bold leading-tight mb-6">
              The AI-Native Global Ledger for<br />
              <span style={{ color: "#FFFFFF" }}>Verified Market Intelligence.</span>
            </h1>

            <p className="text-xl mb-8" style={{ color: "#9CA3AF" }}>
              Axis is the world’s first Verified Data Refinery-as-a-Service (VDRaaS™), transforming fragmented owner, lending,
              <br />
               consumer, behavioral, macro, and cross-asset data into the single predictive intelligence layer enterprises rely on.
            </p>

            <div className="flex gap-4">
              <button
                className="cursor-pointer px-6 py-1 rounded-lg font-semibold transition"
                style={{
                  backgroundColor: "#00B8B8",
                  color: "#FFFFFF",
                }}
              >
                Request Institutional Demo
              </button>

              <button
                className="bg-transparent border-2 px-8 py-4 rounded-lg font-semibold text-lg transition"
                style={{
                  borderColor: "#9CA3AF",
                  color: "#FFFFFF",
                }}
              >
                Download Compliance 3.0 Audit Snapshot
              </button>
            </div>
          </div>
          
          {/* Right Dashboard */}
          <div
            className="rounded-2xl rounded-r-none p-8 border-t-2 border-b-2 border-l-2 border-r-0"
            style={{
              backgroundColor: "#1A1A1A",
              borderColor: "#2A2A2A",
            }}
          >

            {/* Stats Row */}
            <div
              className="grid grid-cols-4 gap-4 mb-8 rounded p-4"
              style={{
                backgroundColor: "#21242b",
                border: "1px solid #21242b",
              }}
            >
              {[
                { label: "Total Records", value: "9,872" },
                { label: "Qualified Owners", value: "5,462" },
                { label: "Active Refi Window", value: "2,109" },
                { label: "High-Equity Owners", value: "3,489" },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ color: "#9CA3AF" }} className="text-sm mb-1">
                    {stat.label}
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6">

              {/* Line Chart */}
              <div
                className="flex flex-col space-y-3 rounded p-4"
                style={{ backgroundColor: "#1A1E24" }}
              >
                <h3 className="text-lg font-semibold mb-4">Refi Opportunity Over Time</h3>

                <div
                  className="relative h-48 rounded-lg p-4"
                  style={{ backgroundColor: "#0D1219" }}
                >
                  <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#33DDDD" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#33DDDD" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 0,120 Q 50,110 100,90 T 200,50 T 300,20 L 300,150 L 0,150 Z"
                      fill="url(#gradient)"
                    />
                    <path
                      d="M 0,120 Q 50,110 100,90 T 200,50 T 300,20"
                      fill="none"
                      stroke="#00D1D1"
                      strokeWidth="2"
                    />
                  </svg>

                  <div className="absolute bottom-2 left-4 text-xs" style={{ color: "#9CA3AF" }}>
                    8776
                  </div>
                  <div className="absolute bottom-2 right-4 text-xs" style={{ color: "#9CA3AF" }}>
                    662
                  </div>
                </div>
              </div>

              {/* Donut Chart */}
              <div
                className="rounded p-4 flex flex-col space-y-5"
                style={{ backgroundColor: "#1A1E24" }}
              >
                <h3 className="text-lg font-semibold mb-4">Segment Breakdown</h3>

                <div className="relative h-48 flex items-center justify-center">
                  <svg className="w-40 h-40" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#00D1D1" strokeWidth="15" strokeDasharray="120 220" transform="rotate(-90 50 50)" />
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="15" strokeDasharray="80 220" strokeDashoffset="-120" transform="rotate(-90 50 50)" />
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#4b5563" strokeWidth="15" strokeDasharray="20 220" strokeDashoffset="-200" transform="rotate(-90 50 50)" />
                  </svg>

                  {/* Legend */}
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#00D1D1" }}></div>
                      <span style={{ color: "#9CA3AF" }}>Core Equity - Ready Now</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                      <span style={{ color: "#9CA3AF" }}>High Equity - 5-22 Months</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#4b5563]"></div>
                      <span style={{ color: "#9CA3AF" }}>DNC Cooldown</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>


         <div className="px-8 lg:pr-0 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-bold leading-tight mb-6">
              Latest Verified Data Refinery & Axis Visuals.
            </h1>

            <p className="text-xl mb-8" style={{ color: "#9CA3AF" }}>
              This is the standard we started building, and are building toward.
              This is our architecture, our direction, and you are part of creating a category.
              <br />
              These visuals are now part of our investor, enterpri
              se, and partner-facing ecosystem.
              Wanted you to see what you are helping bring to life.
              Let lock this together.
            </p>
          </div>

          {/* right Content */}
          <div
            className="rounded-2xl rounded-r-none p-8 border-t-2 border-b-2 border-l-2 border-r-0"
            style={{
              backgroundColor: "#1A1A1A",
              borderColor: "#2A2A2A",
            }}
          >
            <img src="/axis-image.jpeg" className='rounded-lg' alt="" />
          </div>

        </div>

      </div>

      <div
        className="w-full py-20 px-6"
        style={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
        }}
      >

        {/* WHO IT'S FOR */}
        <ScrollReveal>

          <div id="who-it-for" className="mx-auto mb-20">
            <h2
              className="text-sm tracking-widest mb-6"
              style={{ color: "#00D1D1" }}
            >
              WHO IT'S FOR
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Brokerages & Teams",
                  desc: "Give your agents ranked, ready-to-call lists linked to live dashboards and market intel.",
                },
                {
                  title: "Lenders & Firms",
                  desc: "See refinance windows and churn clocks before your competitors do, market by market.",
                },
                {
                  title: "VCs & Partners",
                  desc: "Verify traction with 7-page reports, live metrics, and compliance-ready data trails.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl transition hover:brightness-110"
                  style={{
                    backgroundColor: "#1A1A1A",
                  }}
                >
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* HOW IT WORKS */}
        <ScrollReveal>
          <div id="how-it-works" className="max-w-6xl mx-auto mb-20">
            <h2
              className="text-sm tracking-widest mb-6"
              style={{ color: "#00D1D1" }}
            >
              HOW IT WORKS
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Upload CSV",
                  desc: "Drop in your market or client list — owners, loans, or refi data. No reformatting required.",
                },
                {
                  step: "02",
                  title: "Axis Engine Analyzes",
                  desc: "We clean, verify, and score the data, detect refi windows, and segment every record.",
                },
                {
                  step: "03",
                  title: "Dashboard & 7-Page PDF",
                  desc: "You get an AI dashboard and a board-ready 7-page market intelligence report in minutes.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl transition hover:brightness-110"
                  style={{
                    backgroundColor: "#1A1A1A",
                  }}
                >
                  <span className="text-xs" style={{ color: "#33DDDD" }}>
                    {item.step}
                  </span>

                  <h3 className="font-semibold mt-3 mb-2">{item.title}</h3>

                  <p className="text-sm" style={{ color: "#9CA3AF" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        {/* WHAT'S IN THE DASHBOARD */}
        <ScrollReveal>

          <div id="dashboard" className="max-w-6xl mx-auto">
            <h2
              className="text-sm tracking-widest mb-6"
              style={{ color: "#00D1D1" }}
            >
              WHAT'S IN THE DASHBOARD
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Hot / warm / watchlist segments ranked by predicted opportunity.",
                "Visual charts for refi opportunity, churn clocks, and equity movement.",
                "Core KPIs: total records, qualified owners, refi windows, equity tiers.",
                "7-page PDF export that mirrors what firms and VCs expect in the boardroom.",
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl transition hover:brightness-110 text-sm"
                  style={{
                    backgroundColor: "#1A1A1A",
                    color: "#9CA3AF",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </>
  );
}
