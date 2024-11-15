"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  HomeIcon, 
  SearchIcon, 
  PlusSquareIcon, 
  HeartIcon, 
  UserIcon,
  CompassIcon
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/explore", icon: CompassIcon, label: "Explore" },
    { href: "/create", icon: PlusSquareIcon, label: "Create" },
    { href: "/activity", icon: HeartIcon, label: "Activity" },
    { href: "/profile", icon: UserIcon, label: "Profile" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
        <Link href="/" className="text-xl font-bold">
          Photogram
        </Link>
        
        <div className="hidden md:block">
          <div className="relative">
            <SearchIcon className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-64 py-1.5 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>

        <nav className="flex items-center space-x-6">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative p-2 rounded-lg hover:bg-gray-100 transition-colors",
                pathname === href && "text-blue-500"
              )}
            >
              <Icon className="w-6 h-6" />
              {pathname === href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-1 mx-2 bg-blue-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}