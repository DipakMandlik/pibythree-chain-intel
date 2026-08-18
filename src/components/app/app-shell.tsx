import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ProductLockup, Logo } from "@/components/app/brand";
import { SeverityBadge } from "@/components/app/badges";
import { navGroups, pageTitles } from "@/lib/nav";
import { sessionStore, useSession } from "@/lib/session";
import {
  canAccess,
  demandAnomalies,
  demandNotifications,
  skuById,
  skus,
  storeById,
  stores,
} from "@/data/demo";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (session === null && typeof window !== "undefined") {
      const t = setTimeout(() => {
        if (sessionStore.get() === null) navigate({ to: "/", replace: true });
      }, 60);
      return () => clearTimeout(t);
    }
  }, [session, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const groups = useMemo(() => {
    if (!session) return [];
    return navGroups
      .map((g) => ({ ...g, items: g.items.filter((i) => canAccess(session.role, i.to)) }))
      .filter((g) => g.items.length > 0);
  }, [session]);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3 bg-surface text-sm text-muted-foreground">
        <Logo className="h-7" />
        Restoring secure session…
      </div>
    );
  }

  const title = pageTitles[pathname] ?? "Predictive Demand Intelligence";

  const sidebar = (
    <nav className={cn("flex h-full flex-col bg-sidebar", collapsed ? "w-[4.5rem]" : "w-64")}>
      <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-3">
        {collapsed ? <ProductLockup compact /> : <ProductLockup />}
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-3">
        {groups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && <p className="label-eyebrow px-2 pb-1.5">{group.label}</p>}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      title={item.label}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "size-4 shrink-0",
                          active ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {session.initials}
          </span>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-navy">{session.name}</p>
              <p className="truncate text-xs text-muted-foreground">{session.roleLabel}</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="mt-2 flex gap-1">
            <Button asChild variant="ghost" size="sm" className="flex-1 justify-start px-2">
              <Link to="/governance/ai-activity">
                <Settings className="size-3.5" /> Settings
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-2"
              onClick={() => {
                sessionStore.signOut();
                navigate({ to: "/", replace: true });
              }}
            >
              <LogOut className="size-3.5" /> Sign out
            </Button>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 w-full justify-center"
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? (
            <ChevronsRight className="size-4" />
          ) : (
            <>
              <ChevronsLeft className="size-4" /> Collapse
            </>
          )}
        </Button>
      </div>
    </nav>
  );

  return (
    <div className="flex min-h-screen w-full bg-surface">
      <aside className="sticky top-0 hidden h-screen shrink-0 border-r border-sidebar-border lg:block">
        {sidebar}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full border-r border-sidebar-border shadow-panel">
            {sidebar}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-4" />
          </Button>
          <h2 className="truncate text-sm font-semibold text-navy">{title}</h2>
          <button
            onClick={() => setSearchOpen(true)}
            className="mx-auto hidden w-full max-w-md items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 md:flex"
          >
            <Search className="size-3.5" />
            Search SKUs, stores, categories, forecasts…
            <kbd className="ml-auto rounded border border-border bg-card px-1.5 text-[0.6875rem]">
              ⌘K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <span className="hidden items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted-foreground xl:flex">
              <span className="size-1.5 rounded-full bg-positive" />
              AI Forecast Engine ● Operational
            </span>
            <span className="hidden text-xs text-muted-foreground 2xl:inline">
              Data refreshed 09:42 AM
            </span>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="size-4" />
                  <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-critical" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-96 p-0">
                <div className="border-b border-border px-3 py-2 text-sm font-semibold text-navy">
                  Notifications
                </div>
                <ul className="max-h-80 overflow-y-auto">
                  {demandNotifications.map((a) => (
                    <li key={a.id}>
                      <Link
                        to={a.link}
                        className="block border-b border-border px-3 py-2.5 hover:bg-surface"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-navy">{a.title}</span>
                          <SeverityBadge severity={a.severity} />
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{a.what}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="p-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/ai/insights">View all AI demand insights</Link>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-md px-1.5 py-1 hover:bg-surface">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {session.initials}
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block text-sm font-medium leading-tight text-navy">
                      {session.name}
                    </span>
                    <span className="block text-xs leading-tight text-muted-foreground">
                      {session.roleLabel}
                    </span>
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="text-sm font-medium text-navy">{session.name}</p>
                  <p className="text-xs font-normal text-muted-foreground">{session.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/governance/ai-activity">
                    <User className="size-4" /> Profile &amp; preferences
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/governance/ai-activity">
                    <ShieldCheck className="size-4" /> AI activity
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/governance/audit">
                    <ShieldCheck className="size-4" /> Audit trail
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    sessionStore.signOut();
                    navigate({ to: "/", replace: true });
                  }}
                >
                  <LogOut className="size-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[112rem] flex-1 space-y-5 p-4 lg:p-6">
          {children}
        </main>

        <footer className="border-t border-border bg-card px-6 py-3">
          <div className="mx-auto flex max-w-[112rem] flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <Logo className="h-5" />
              <span>
                Predictive Demand Intelligence — forecast demand with intelligence, plan with
                confidence
              </span>
            </span>
            <span>DMART Demonstration Environment</span>
          </div>
        </footer>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search SKUs, stores, categories, forecasts, anomalies…" />
        <CommandList>
          <CommandEmpty>No matching records in the demonstration dataset.</CommandEmpty>
          <CommandGroup heading="SKUs">
            {skus.map((s) => (
              <CommandItem
                key={s.id}
                value={`${s.name} ${s.code}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/demand/skus" });
                }}
              >
                {s.name} <span className="ml-auto text-xs text-muted-foreground">{s.code}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Stores">
            {stores.map((s) => (
              <CommandItem
                key={s.id}
                value={`${s.name} ${s.code}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/demand/stores" });
                }}
              >
                {s.name} <span className="ml-auto text-xs text-muted-foreground">{s.code}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Demand anomalies">
            {demandAnomalies.slice(0, 8).map((a) => (
              <CommandItem
                key={a.id}
                value={`${skuById(a.skuId).name} ${storeById(a.storeId).name}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/demand/anomalies" });
                }}
              >
                {skuById(a.skuId).name}{" "}
                <span className="ml-auto text-xs text-muted-foreground">
                  {storeById(a.storeId).name}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
