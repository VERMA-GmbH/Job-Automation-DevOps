import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

export default function Header() {
  return (
    <header className="p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-2">
        {/* icon */}
        <span>
          <FaPhoneAlt size={18} />
        </span>
        {/* text link */}
        <a href={"/"}>
          <span className="font-mono sm:text-lg md:text-xl">
            React Contacts
          </span>
        </a>
      </div>
    </header>
  );
}
