import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";

const columns = [
  {title:"Platform",links:[["Overview","/"],["Activity","/wire"],["Contributors","/creators"]]},
  {title:"Value",links:[["Earnings","/rewards"],["Records","/proof"],["Distribution model","/#platform"]]},
  {title:"Resources",links:[["How it works","/#platform"],["Solana Explorer","https://explorer.solana.com"]]},
];

export function SiteFooter() {
  return <footer className="border-t border-border bg-[#151412]" aria-label="Site footer"><Container className="pt-16">
    <div className="grid gap-12 border-b border-border pb-16 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
      <div><Link href="/" aria-label="ONIX home" className="inline-flex items-center gap-1 text-[27px] font-bold tracking-[-.06em]"><Image src="/assets/logo.png" alt="" width={44} height={44} className="size-11 object-contain" />ONIX</Link><p className="mt-6 max-w-[340px] text-[27px] font-semibold leading-tight tracking-[-.05em]">The infrastructure between activity and value.</p><p className="mt-5 max-w-[330px] text-sm leading-6 text-text-muted">Track public signals, measure contribution, and inspect how value moves through the network.</p></div>
      {columns.map(column=><nav aria-label={column.title} key={column.title}><h2 className="font-mono text-[10px] uppercase tracking-[.14em] text-lime">{column.title}</h2><ul className="mt-6 space-y-4">{column.links.map(([label,href])=><li key={href}><Link href={href} target={href.startsWith("http")?"_blank":undefined} rel={href.startsWith("http")?"noopener noreferrer":undefined} className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-lime">{label}{href.startsWith("http")?<ArrowUpRight size={12}/>:null}</Link></li>)}</ul></nav>)}
    </div>
    <div className="flex flex-wrap justify-between gap-3 py-6 font-mono text-[10px] uppercase tracking-[.1em] text-text-muted"><span>© 2026 ONIX</span><span>Prototype activity and distribution data · Solana wallet connection</span><span>Signal → Contribution → Distribution</span></div>
  </Container></footer>;
}
