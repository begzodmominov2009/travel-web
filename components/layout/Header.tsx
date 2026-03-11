"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 text-white">
          <div className="leading-tight">
            <p className="text-[18px] tracking-wide font-bold">
              BEST HOTELS <span className="text-orange-400">PRICES</span>
            </p>
          </div>
        </div>

        {/* Language */}
        <div className="text-white text-sm flex gap-3">
          <Link href="#">English</Link>
          <span>|</span>
          <Link href="#">UZS</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
