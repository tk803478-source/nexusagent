import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  FileText,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Services", href: "/admin/services", icon: Package },
  { name: "Service Requests", href: "/admin/requests", icon: ClipboardList },
  { name: "Applications", href: "/admin/applications", icon: Users },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  // Fetch unread notifications count
  useEffect(() => {
    if (!user || !isAdmin) return;

    const fetchUnreadCount = async () => {
      const { count } = await supabase
        .from("admin_notifications")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);

      setUnreadCount(count || 0);
    };

    fetchUnreadCount();

    // Subscribe to real-time notifications
    const channel = supabase
      .channel("admin-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "admin_notifications",
        },
        () => {
          fetchUnreadCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isAdmin]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b z-50 px-4 flex items-center justify-between">
        <Link to="/admin" className="text-xl font-display font-bold text-primary">
          Admin Panel
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/admin/notifications" className="relative p-2">
            <Bell size={20} className="text-muted-foreground" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r transform transition-transform duration-200 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <Link to="/admin" className="text-xl font-display font-bold text-primary">
            Admin Panel
          </Link>
        </div>

        <nav className="px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
                {item.name === "Service Requests" && unreadCount > 0 && !isActive && (
                  <Badge variant="secondary" className="ml-auto">
                    {unreadCount}
                  </Badge>
                )}
              </Link>
            );
          })}

          <Link
            to="/admin/notifications"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === "/admin/notifications"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Bell size={20} />
            <span className="font-medium">Notifications</span>
            {unreadCount > 0 && location.pathname !== "/admin/notifications" && (
              <Badge variant="destructive" className="ml-auto">
                {unreadCount}
              </Badge>
            )}
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="text-sm text-muted-foreground mb-3 px-4 truncate">
            {user?.email}
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </Button>
          <Button variant="ghost" className="w-full justify-start mt-2" asChild>
            <Link to="/">
              <ChevronRight size={18} className="mr-2" />
              View Website
            </Link>
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
