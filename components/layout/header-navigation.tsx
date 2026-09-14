"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Signals", href: "/wire" },
  { label: "Rewards", href: "/rewards" },
  { label: "Ledger", href: "/proof" },
];

export function HeaderNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="hidden justify-self-center md:block">
      <ul className="flex items-center gap-8">
        {navigation.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={false}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-[68px] items-center text-[14px] font-semibold tracking-[-0.01em] transition-colors duration-200 ${
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
