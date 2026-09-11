"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/icon";

const navItems: Array<{ href: string; label: string; icon: IconName }> = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
  { href: "/properties", label: "Properties", icon: "properties" },
  { href: "/bookings", label: "Bookings", icon: "bookings" },
  { href: "/maintenance", label: "Maintenance", icon: "maintenance" },
];

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <div className="app-shell">
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand"><span className="brand-mark"><Icon name="building" size={19} /></span><div><span className="brand-name">SAGE</span><span className="brand-subtitle">Property operations</span></div></div>
      <nav aria-label="Primary navigation" className="side-nav">
        <p className="nav-label">Workspace</p>
        {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`nav-item ${isCurrent(pathname, item.href) ? "nav-item-active" : ""}`} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}><Icon name={item.icon} size={19} />{item.label}</Link>)}
      </nav>
      <div className="sidebar-foot"><span className="avatar">MO</span><div><strong>Maya Okafor</strong><span>Operations lead</span></div></div>
    </aside>
    {open ? <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} /> : null}
    <div className="workspace">
      <header className="mobile-header"><div className="brand compact"><span className="brand-mark"><Icon name="building" size={18} /></span><span className="brand-name">SAGE</span></div><button className="icon-button" aria-label="Open navigation" onClick={() => setOpen(true)}><Icon name="menu" /></button></header>
      <main className="main-content">{children}</main>
      <nav aria-label="Mobile navigation" className="bottom-nav">{navItems.map((item) => <Link key={item.href} href={item.href} className={isCurrent(pathname, item.href) ? "bottom-active" : ""} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}><Icon name={item.icon} size={20} /><span>{item.label}</span></Link>)}</nav>
    </div>
  </div>;
}
