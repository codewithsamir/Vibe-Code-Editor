import React from "react";
import { Github, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-200 bg-white text-gray-600 dark:border-gray-800 dark:bg-black dark:text-gray-400">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            VideoCode
          </h2>
          <p className="text-sm mt-1">
            Fast, simple, and creator‑first code editor.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 items-center">
          <a href="#github" aria-label="GitHub" className="hover:text-current">
            <Github className="h-5 w-5" />
          </a>
          <a href="#twitter" aria-label="Twitter" className="hover:text-current">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#youtube" aria-label="YouTube" className="hover:text-current">
            <Youtube className="h-5 w-5" />
          </a>
     
          <a href="#mail" aria-label="Mail" className="hover:text-current">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-sm text-gray-400 dark:text-gray-500">
        © {year} VideoCode Labs. All rights reserved.
      </div>
    </footer>
  );
}
