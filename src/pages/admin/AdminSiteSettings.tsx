import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings, useUpdateSiteSettings, defaultSettings } from "@/hooks/useSiteSettings";
import { 
  Save, 
  Globe, 
  Home, 
  Info, 
  Phone, 
  RefreshCw,
  CheckCircle2,
  Loader2
} from "lucide-react";

export default function AdminSiteSettings() {
  const { toast } = useToast();
  const { settings, loading, refetch } = useSiteSettings();
  const { updateMultipleSettings, saving } = useUpdateSiteSettings();
  const [formData, setFormData] = useState(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (!loading) {
      setFormData(settings);
    }
  }, [settings, loading]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleArrayChange = (key: string, index: number, field: string, value: string) => {
    setFormData((prev) => {
      const array = [...(prev[key as keyof typeof prev] as any[] || [])];
      array[index] = { ...array[index], [field]: value };
      return { ...prev, [key]: array };
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    const success = await updateMultipleSettings(formData);
    
    if (success) {
      toast({ 
        title: "Changes Published",
        description: "All updates are now live across the website.",
      });
      setHasChanges(false);
      setLastSaved(new Date());
      refetch();
    } else {
      toast({ 
        title: "Error", 
        description: "Failed to save changes. Please try again.",
        variant: "destructive" 
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Site Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage website content from one central place.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {lastSaved && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <CheckCircle2 size={14} className="text-green-500" />
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
            <Button variant="outline" size="sm" onClick={refetch}>
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </Button>
            <Button onClick={handleSave} disabled={saving || !hasChanges}>
              {saving ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Publish Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {hasChanges && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <span className="text-sm font-medium">You have unsaved changes.</span>
            <span className="text-sm">Click "Publish Changes" to make them live.</span>
          </div>
        )}

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe size={16} />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="homepage" className="flex items-center gap-2">
              <Home size={16} />
              <span className="hidden sm:inline">Homepage</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Info size={16} />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone size={16} />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Basic company details used across the website.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name || ""}
                      onChange={(e) => handleChange("company_name", e.target.value)}
                      placeholder="Nexus Digital Agency"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_tagline">Tagline</Label>
                    <Input
                      id="company_tagline"
                      value={formData.company_tagline || ""}
                      onChange={(e) => handleChange("company_tagline", e.target.value)}
                      placeholder="Your Digital Growth Partner"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Homepage Settings */}
          <TabsContent value="homepage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Main banner content on the homepage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero_subtitle">Subtitle Badge</Label>
                  <Input
                    id="hero_subtitle"
                    value={formData.hero_subtitle || ""}
                    onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                    placeholder="Full-Service Digital Agency"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero_title">Main Title</Label>
                  <Input
                    id="hero_title"
                    value={formData.hero_title || ""}
                    onChange={(e) => handleChange("hero_title", e.target.value)}
                    placeholder="We Build Digital Experiences That Drive Results"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero_description">Description</Label>
                  <Textarea
                    id="hero_description"
                    value={formData.hero_description || ""}
                    onChange={(e) => handleChange("hero_description", e.target.value)}
                    placeholder="Transform your business with cutting-edge solutions..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Page Settings */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Hero Section</CardTitle>
                <CardDescription>Header content for the About page.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about_hero_title">Title</Label>
                  <Input
                    id="about_hero_title"
                    value={formData.about_hero_title || ""}
                    onChange={(e) => handleChange("about_hero_title", e.target.value)}
                    placeholder="We Build Digital Experiences"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about_hero_description">Description</Label>
                  <Textarea
                    id="about_hero_description"
                    value={formData.about_hero_description || ""}
                    onChange={(e) => handleChange("about_hero_description", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Story</CardTitle>
                <CardDescription>Company history and background.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.about_story || ""}
                  onChange={(e) => handleChange("about_story", e.target.value)}
                  rows={8}
                  placeholder="Tell your company story..."
                />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.about_mission || ""}
                    onChange={(e) => handleChange("about_mission", e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.about_vision || ""}
                    onChange={(e) => handleChange("about_vision", e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Key numbers displayed on the About page.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(formData.about_stats || []).map((stat, index) => (
                    <div key={index} className="space-y-2 p-4 border rounded-lg">
                      <Input
                        value={stat.value}
                        onChange={(e) => handleArrayChange("about_stats", index, "value", e.target.value)}
                        placeholder="200+"
                        className="text-center font-bold"
                      />
                      <Input
                        value={stat.label}
                        onChange={(e) => handleArrayChange("about_stats", index, "label", e.target.value)}
                        placeholder="Projects"
                        className="text-center text-sm"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Team displayed on the About page.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(formData.about_team || []).map((member, index) => (
                    <div key={index} className="space-y-2 p-4 border rounded-lg">
                      <Input
                        value={member.name}
                        onChange={(e) => handleArrayChange("about_team", index, "name", e.target.value)}
                        placeholder="Name"
                      />
                      <Input
                        value={member.role}
                        onChange={(e) => handleArrayChange("about_team", index, "role", e.target.value)}
                        placeholder="Role"
                        className="text-sm"
                      />
                      <Input
                        value={member.expertise}
                        onChange={(e) => handleArrayChange("about_team", index, "expertise", e.target.value)}
                        placeholder="Expertise"
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Page Settings */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_hero_title">Title</Label>
                  <Input
                    id="contact_hero_title"
                    value={formData.contact_hero_title || ""}
                    onChange={(e) => handleChange("contact_hero_title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_hero_description">Description</Label>
                  <Textarea
                    id="contact_hero_description"
                    value={formData.contact_hero_description || ""}
                    onChange={(e) => handleChange("contact_hero_description", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Company contact details.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Email</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={formData.contact_email || ""}
                      onChange={(e) => handleChange("contact_email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Phone</Label>
                    <Input
                      id="contact_phone"
                      value={formData.contact_phone || ""}
                      onChange={(e) => handleChange("contact_phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="contact_address">Address</Label>
                    <Input
                      id="contact_address"
                      value={formData.contact_address || ""}
                      onChange={(e) => handleChange("contact_address", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="contact_hours">Business Hours</Label>
                    <Input
                      id="contact_hours"
                      value={formData.contact_hours || ""}
                      onChange={(e) => handleChange("contact_hours", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
