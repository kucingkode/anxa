import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  ClipboardList,
  Package,
  Factory,
  BookOpen,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/patients", label: "Pasien", icon: Users, permission: "patients:read" },
  { to: "/queues", label: "Antrean", icon: ClipboardList, permission: "queues:read" },
  { to: "/products", label: "Produk", icon: Package, permission: "products:read" },
  { to: "/manufacturers", label: "Manufaktur", icon: Factory, permission: "manufacturers:read" },
  { to: "/users", label: "Pengguna", icon: Users, permission: "users:read" },
  { to: "/roles", label: "Peran", icon: ShieldCheck, permission: "roles:read" },
  { to: "/references/conditions", label: "Referensi Diagnosa", icon: BookOpen, permission: "condition-references:read" },
  { to: "/references/procedures", label: "Referensi Prosedur", icon: BookOpen, permission: "procedure-references:read" },
];

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  const filteredNav = navItems.filter((item) => !item.permission || hasPermission(user, item.permission));

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transform transition-transform lg:translate-x-0 lg:static lg:z-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Stethoscope className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">SIMK</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {filteredNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t p-4">
          <div className="mb-2 text-xs text-muted-foreground">
            {user?.email} <span className="ml-1 rounded bg-muted px-1 py-0.5">{user?.role.name}</span>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b px-6 lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <span className="font-semibold">SIMK — Sistem Informasi & Manajemen Klinik</span>
        </header>
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}