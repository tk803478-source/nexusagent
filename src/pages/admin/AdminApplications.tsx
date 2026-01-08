import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, Mail, Phone, Briefcase, ExternalLink, Calendar, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import type { Tables, Enums } from "@/integrations/supabase/types";

type TeamApplication = Tables<"team_applications"> & {
  positions: { title: string; department: string } | null;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AdminApplications() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<TeamApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<TeamApplication | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    fetchApplications();

    // Real-time subscription
    const channel = supabase
      .channel("team-applications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "team_applications" },
        () => fetchApplications()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchApplications() {
    const { data, error } = await supabase
      .from("team_applications")
      .select("*, positions(title, department)")
      .order("created_at", { ascending: false });

    if (data) setApplications(data);
    setLoading(false);
  }

  const openDetails = (application: TeamApplication) => {
    setSelectedApplication(application);
    setAdminNotes(application.admin_notes || "");
    setDialogOpen(true);
  };

  const updateStatus = async (status: Enums<"application_status">) => {
    if (!selectedApplication) return;

    const { error } = await supabase
      .from("team_applications")
      .update({ status, admin_notes: adminNotes })
      .eq("id", selectedApplication.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update application.", variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Application ${status}.` });
      setDialogOpen(false);
      fetchApplications();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Team Applications
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and manage job applications.
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
        ) : applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold text-foreground">{application.full_name}</h3>
                        <Badge className={statusColors[application.status || "pending"]}>
                          {application.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail size={14} />
                          {application.email}
                        </span>
                        {application.positions && (
                          <span className="flex items-center gap-1">
                            <Briefcase size={14} />
                            {application.positions.title}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {format(new Date(application.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        <strong>Skills:</strong> {application.skills}
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => openDetails(application)}>
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
              <p className="text-muted-foreground">No applications yet.</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>
            {selectedApplication && (
              <div className="space-y-6 mt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Applicant</h4>
                    <p className="font-medium">{selectedApplication.full_name}</p>
                    <p className="text-sm text-muted-foreground">{selectedApplication.email}</p>
                    {selectedApplication.phone && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Phone size={14} />
                        {selectedApplication.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    {selectedApplication.positions && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Position</h4>
                        <p>{selectedApplication.positions.title}</p>
                        <p className="text-sm text-muted-foreground">{selectedApplication.positions.department}</p>
                      </div>
                    )}
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Applied</h4>
                    <p>{format(new Date(selectedApplication.created_at), "MMMM d, yyyy 'at' h:mm a")}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {selectedApplication.portfolio_url && (
                    <a
                      href={selectedApplication.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                    >
                      <ExternalLink size={14} />
                      Portfolio
                    </a>
                  )}
                  {selectedApplication.linkedin_url && (
                    <a
                      href={selectedApplication.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                    >
                      <ExternalLink size={14} />
                      LinkedIn
                    </a>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Skills & Experience</h4>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedApplication.skills}</p>
                  </div>
                </div>

                {selectedApplication.message && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Message</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="whitespace-pre-wrap">{selectedApplication.message}</p>
                    </div>
                  </div>
                )}

                <div className="border-t pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Admin Notes</Label>
                    <Textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Internal notes about this applicant..."
                      rows={3}
                    />
                  </div>

                  <div className="flex flex-wrap justify-end gap-3">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Close
                    </Button>
                    {selectedApplication.status === "pending" && (
                      <>
                        <Button
                          variant="destructive"
                          onClick={() => updateStatus("rejected")}
                        >
                          <XCircle size={18} className="mr-2" />
                          Reject
                        </Button>
                        <Button onClick={() => updateStatus("approved")}>
                          <CheckCircle size={18} className="mr-2" />
                          Approve
                        </Button>
                      </>
                    )}
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
