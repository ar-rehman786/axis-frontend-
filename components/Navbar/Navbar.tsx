"use client";

import { usePathname } from "next/navigation";

export default function Header() {

  const pathname = usePathname();

  // sirf root "/" par header show hoga
  if (pathname !== "/") {
    return null;
  }

  // if (
  //   pathname.startsWith("/lender-dashboard") ||
  //   pathname.startsWith("/RealtorDashboard") ||
  //   pathname.startsWith("/TitleCompanyDadhbaord")
  // ) {
  //   return null;
  // }
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-black">
      {/* Logo Section */}
      <div className="flex items-center gap-6">
        <div className="w-15 h-15 rounded-full overflow-hidden border border-gray-400/20">
          <img
            src="/axis-trade-market.jpeg"
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>

        <a href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-semibold text-white">
            Axis Trade Market
          </span>
          <span className="text-sm pl-12 text-gray-400">
            Clean Data You Can Trust
          </span>
        </a>
      </div>

      {/* Middle Links */}
      <div className="flex justify-between gap-8">
        <a
          href="#who-it-for"
          className="text-gray-400 hover:text-white transition-colors duration-300"
        >
          WHO IT'S FOR
        </a>

        <a
          href="#how-it-works"
          className="text-gray-400 hover:text-white transition-colors duration-300"
        >
          How It Works
        </a>

        <a
          href="#use-cases"
          className="text-gray-400 hover:text-white transition-colors duration-300"
        >
          Use Cases
        </a>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-8">
        <a
          href="/login"
          className="text-gray-400 hover:text-white transition-colors duration-300"
        >
          Log In
        </a>

        <button className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300">
          Request Demo
        </button>
      </div>
    </nav>
  );
}
