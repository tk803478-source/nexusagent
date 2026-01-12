import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Briefcase, CheckCircle2, Clock } from "lucide-react";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

type Position = Tables<"positions">;

export default function AdminPositions() {
  const { toast } = useToast();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    requirements: "",
    is_open: true,
  });

  useEffect(() => {
    fetchPositions();
  }, []);

  async function fetchPositions() {
    const { data, error } = await supabase
      .from("positions")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPositions(data);
    if (error) {
      toast({ title: "Error", description: "Failed to fetch positions.", variant: "destructive" });
    }
    setLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      department: "",
      description: "",
      requirements: "",
      is_open: true,
    });
    setEditingPosition(null);
  };

  const openEditDialog = (position: Position) => {
    setEditingPosition(position);
    setFormData({
      title: position.title,
      department: position.department,
      description: position.description || "",
      requirements: position.requirements || "",
      is_open: position.is_open ?? true,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const positionData = {
      title: formData.title,
      department: formData.department,
      description: formData.description || null,
      requirements: formData.requirements || null,
      is_open: formData.is_open,
    };

    if (editingPosition) {
      const { error } = await supabase
        .from("positions")
        .update(positionData)
        .eq("id", editingPosition.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update position.", variant: "destructive" });
      } else {
        toast({ 
          title: "Position Updated", 
          description: `"${formData.title}" has been updated and changes are now live.`,
        });
        setDialogOpen(false);
        resetForm();
        fetchPositions();
      }
    } else {
      const { error } = await supabase.from("positions").insert([positionData]);

      if (error) {
        toast({ title: "Error", description: "Failed to create position.", variant: "destructive" });
      } else {
        toast({ 
          title: "Position Published", 
          description: `"${formData.title}" is now live on the careers page.`,
        });
        setDialogOpen(false);
        resetForm();
        fetchPositions();
      }
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    const { error } = await supabase.from("positions").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete position.", variant: "destructive" });
    } else {
      toast({ 
        title: "Position Removed", 
        description: `"${title}" has been removed from the careers page.`,
      });
      fetchPositions();
    }
  };

  const toggleStatus = async (position: Position) => {
    const newStatus = !position.is_open;
    const { error } = await supabase
      .from("positions")
      .update({ is_open: newStatus })
      .eq("id", position.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    } else {
      toast({ 
        title: newStatus ? "Position Opened" : "Position Closed", 
        description: `"${position.title}" is now ${newStatus ? "accepting applications" : "closed for applications"}.`,
      });
      fetchPositions();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Career Positions
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage job openings displayed on the careers page.
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={18} className="mr-2" />
                Add Position
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPosition ? "Edit Position" : "Add New Position"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Senior Frontend Developer"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Engineering"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the role, responsibilities, and what a typical day looks like..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="List required skills, experience, and qualifications..."
                    rows={4}
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_open"
                      checked={formData.is_open}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, is_open: checked }))
                      }
                    />
                    <Label htmlFor="is_open">Position open for applications</Label>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingPosition ? "Update & Publish" : "Create & Publish"}
                    </Button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <CheckCircle2 size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {positions.filter(p => p.is_open).length}
                </p>
                <p className="text-sm text-muted-foreground">Open Positions</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gray-100">
                <Clock size={24} className="text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {positions.filter(p => !p.is_open).length}
                </p>
                <p className="text-sm text-muted-foreground">Closed Positions</p>
              </div>
            </CardContent>
          </Card>
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
        ) : positions.length > 0 ? (
          <div className="space-y-4">
            {positions.map((position) => (
              <Card key={position.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-xl ${position.is_open ? "bg-primary/10" : "bg-muted"}`}>
                        <Briefcase size={20} className={position.is_open ? "text-primary" : "text-muted-foreground"} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-foreground">{position.title}</h3>
                          <Badge variant={position.is_open ? "default" : "secondary"}>
                            {position.is_open ? "Open" : "Closed"}
                          </Badge>
                        </div>
                        <p className="text-sm text-primary font-medium mb-2">{position.department}</p>
                        {position.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {position.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Posted {format(new Date(position.created_at), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleStatus(position)}
                      >
                        {position.is_open ? "Close" : "Open"}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(position)}>
                        <Pencil size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(position.id, position.title)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Briefcase size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No positions yet.</p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus size={18} className="mr-2" />
                Add Your First Position
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
