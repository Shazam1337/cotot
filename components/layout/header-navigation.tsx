"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {label:"Platform",href:"/"},
  {label:"Activity",href:"/wire"},
  {label:"Contributors",href:"/creators"},
  {label:"Earnings",href:"/rewards"},
  {label:"Records",href:"/proof"},
];

export function HeaderNavigation({mobile=false}:{mobile?:boolean}) {
  const pathname=usePathname();
  return <nav aria-label={mobile?"Mobile navigation":"Primary navigation"} className={mobile?"overflow-x-auto":"hidden xl:block"}>
    <ul className={mobile?"flex min-w-max items-center gap-6":"flex items-center gap-6"}>
      {navigation.map(item=><li key={item.href}><Link href={item.href} aria-current={pathname===item.href?"page":undefined} className={`relative flex items-center whitespace-nowrap text-[18px] font-semibold transition-colors hover:text-text-primary ${pathname===item.href?"text-lime after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-lime":"text-text-secondary"}`} style={{height:mobile?56:104}}>{item.label}</Link></li>)}
    </ul>
  </nav>;
}
