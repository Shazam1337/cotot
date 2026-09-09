"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/" },
  { label: "The Wire", href: "/wire" },
  { label: "Creators", href: "/creators" },
  { label: "Rewards", href: "/rewards" },
  { label: "Proof", href: "/proof" },
];

export function HeaderNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="justify-self-center">
      <ul className="flex items-center gap-7">
        {navigation.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={false}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-[74px] items-center text-[26px] font-medium tracking-[-0.02em] transition-colors duration-200 ${
                  active
                    ? "text-text-primary after:absolute after:inset-x-0 after:bottom-[-1px] after:h-px after:bg-lime"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
