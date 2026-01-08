import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  Users,
  Package,
  FileText,
  Bell,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";

interface Stats {
  totalRequests: number;
  pendingRequests: number;
  totalApplications: number;
  pendingApplications: number;
  activeServices: number;
  publishedPosts: number;
}

interface RecentNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalRequests: 0,
    pendingRequests: 0,
    totalApplications: 0,
    pendingApplications: 0,
    activeServices: 0,
    publishedPosts: 0,
  });
  const [notifications, setNotifications] = useState<RecentNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: totalRequests },
        { count: pendingRequests },
        { count: totalApplications },
        { count: pendingApplications },
        { count: activeServices },
        { count: publishedPosts },
        { data: recentNotifications },
      ] = await Promise.all([
        supabase.from("service_requests").select("*", { count: "exact", head: true }),
        supabase.from("service_requests").select("*", { count: "exact", head: true }).eq("status", "submitted"),
        supabase.from("team_applications").select("*", { count: "exact", head: true }),
        supabase.from("team_applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("services").select("*", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("admin_notifications").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      setStats({
        totalRequests: totalRequests || 0,
        pendingRequests: pendingRequests || 0,
        totalApplications: totalApplications || 0,
        pendingApplications: pendingApplications || 0,
        activeServices: activeServices || 0,
        publishedPosts: publishedPosts || 0,
      });

      setNotifications(recentNotifications || []);
      setLoading(false);
    }

    fetchStats();

    // Real-time subscription for new notifications
    const channel = supabase
      .channel("dashboard-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "admin_notifications",
        },
        (payload) => {
          setNotifications((prev) => [payload.new as RecentNotification, ...prev.slice(0, 4)]);
          // Update stats
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const statCards = [
    {
      title: "Service Requests",
      value: stats.totalRequests,
      pending: stats.pendingRequests,
      icon: ClipboardList,
      href: "/admin/requests",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Team Applications",
      value: stats.totalApplications,
      pending: stats.pendingApplications,
      icon: Users,
      href: "/admin/applications",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Services",
      value: stats.activeServices,
      icon: Package,
      href: "/admin/services",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Published Posts",
      value: stats.publishedPosts,
      icon: FileText,
      href: "/admin/blog",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your agency.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} to={stat.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-3xl font-bold text-foreground mt-1">
                          {loading ? "..." : stat.value}
                        </p>
                        {stat.pending !== undefined && stat.pending > 0 && (
                          <Badge variant="secondary" className="mt-2">
                            {stat.pending} pending
                          </Badge>
                        )}
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                        <Icon size={24} className={stat.color} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Recent Notifications
            </CardTitle>
            <Link
              to="/admin/notifications"
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      notification.is_read ? "bg-background" : "bg-accent/5 border-accent/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(notification.created_at), "MMM d, h:mm a")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No notifications yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/services">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Package size={24} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Manage Services</p>
                  <p className="text-sm text-muted-foreground">Add, edit, or remove services</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/admin/blog">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10">
                  <FileText size={24} className="text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Write Blog Post</p>
                  <p className="text-sm text-muted-foreground">Create SEO content</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/admin/requests">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-100">
                  <TrendingUp size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">View Requests</p>
                  <p className="text-sm text-muted-foreground">Manage client orders</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
