"use client";

import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-600/20 to-transparent rounded-2xl" />
      <div className="relative backdrop-blur-lg bg-white/30 rounded-2xl shadow-md">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <p className="text-gray-700 font-light font-[noto_sans_ethiopic]">2017 ዓ.ም | በ የአብቃል</p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yabqal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors"
            >
              <FaGithub size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
