import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Eye, Mail, Phone, Building, Calendar, DollarSign, Clock } from "lucide-react";
import { format } from "date-fns";
import type { Tables, Enums } from "@/integrations/supabase/types";

type ServiceRequest = Tables<"service_requests"> & {
  services: { name: string } | null;
};

const statusColors: Record<string, string> = {
  submitted: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminRequests() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [status, setStatus] = useState<Enums<"order_status">>("submitted");

  useEffect(() => {
    fetchRequests();

    // Real-time subscription
    const channel = supabase
      .channel("service-requests")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "service_requests" },
        () => fetchRequests()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchRequests() {
    const { data, error } = await supabase
      .from("service_requests")
      .select("*, services(name)")
      .order("created_at", { ascending: false });

    if (data) setRequests(data);
    setLoading(false);
  }

  const openDetails = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setAdminNotes(request.admin_notes || "");
    setStatus(request.status || "submitted");
    setDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedRequest) return;

    const { error } = await supabase
      .from("service_requests")
      .update({ status, admin_notes: adminNotes })
      .eq("id", selectedRequest.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update request.", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Request updated successfully." });
      setDialogOpen(false);
      fetchRequests();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Service Requests
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage client service requests and orders.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold text-foreground">{request.client_name}</h3>
                        <Badge className={statusColors[request.status || "submitted"]}>
                          {request.status?.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail size={14} />
                          {request.client_email}
                        </span>
                        {request.company_name && (
                          <span className="flex items-center gap-1">
                            <Building size={14} />
                            {request.company_name}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {format(new Date(request.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                      {request.services?.name && (
                        <Badge variant="outline">{request.services.name}</Badge>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {request.requirements}
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => openDetails(request)}>
                      <Eye size={18} className="mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No service requests yet.</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Request Details</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-6 mt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Client</h4>
                    <p className="font-medium">{selectedRequest.client_name}</p>
                    <p className="text-sm text-muted-foreground">{selectedRequest.client_email}</p>
                    {selectedRequest.client_phone && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Phone size={14} />
                        {selectedRequest.client_phone}
                      </p>
                    )}
                  </div>
                  <div>
                    {selectedRequest.company_name && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Company</h4>
                        <p>{selectedRequest.company_name}</p>
                      </div>
                    )}
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Submitted</h4>
                    <p>{format(new Date(selectedRequest.created_at), "MMMM d, yyyy 'at' h:mm a")}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {selectedRequest.budget && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                        <DollarSign size={14} />
                        Budget
                      </h4>
                      <p>{selectedRequest.budget.replace(/-/g, " - ").replace("under", "Under $").replace("over", "Over $")}</p>
                    </div>
                  )}
                  {selectedRequest.timeline && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                        <Clock size={14} />
                        Timeline
                      </h4>
                      <p>{selectedRequest.timeline.replace(/-/g, " ")}</p>
                    </div>
                  )}
                </div>

                {selectedRequest.services?.name && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Service Requested</h4>
                    <Badge variant="outline">{selectedRequest.services.name}</Badge>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Requirements</h4>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedRequest.requirements}</p>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={status} onValueChange={(value) => setStatus(value as Enums<"order_status">)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Admin Notes</Label>
                    <Textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Internal notes about this request..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdate}>Update Request</Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
