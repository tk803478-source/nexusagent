import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type SiteSetting = Tables<"site_settings">;

// Type for settings values
export interface PageContent {
  // About page
  about_hero_title?: string;
  about_hero_description?: string;
  about_story?: string;
  about_mission?: string;
  about_vision?: string;
  about_stats?: Array<{ value: string; label: string }>;
  about_values?: Array<{ icon: string; title: string; description: string }>;
  about_team?: Array<{ name: string; role: string; expertise: string }>;
  
  // Contact page
  contact_hero_title?: string;
  contact_hero_description?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  contact_hours?: string;
  
  // Homepage
  hero_title?: string;
  hero_subtitle?: string;
  hero_description?: string;
  
  // General
  company_name?: string;
  company_tagline?: string;
}

// Default values for all settings
export const defaultSettings: PageContent = {
  company_name: "Nexus Digital Agency",
  company_tagline: "Your Digital Growth Partner",
  
  hero_title: "We Build Digital Experiences That Drive Results",
  hero_subtitle: "Full-Service Digital Agency",
  hero_description: "Transform your business with cutting-edge web development, strategic digital marketing, and innovative design solutions. We help brands thrive in the digital landscape.",
  
  about_hero_title: "We Build Digital Experiences",
  about_hero_description: "Nexus Digital Agency is a team of passionate experts dedicated to helping businesses succeed in the digital world through innovative technology and creative solutions.",
  about_story: "Nexus Digital Agency was founded with a simple yet powerful vision: to bridge the gap between businesses and the digital world. In an era where technology evolves at an unprecedented pace, we recognized that many companies struggled to keep up while focusing on their core operations.\n\nWhat started as a small team of passionate developers and marketers has grown into a full-service digital agency serving clients across 15 countries. Our journey has been marked by continuous learning and an unwavering commitment to excellence.\n\nToday, we are proud to have helped over 200 businesses transform their digital presence. Our success is measured not by the number of projects we complete, but by the lasting impact we create for our clients and their customers.",
  about_mission: "To empower businesses with innovative digital solutions that drive growth, enhance customer experiences, and create lasting competitive advantages.",
  about_vision: "To be the trusted digital partner for businesses worldwide, recognized for our innovative solutions and meaningful contributions to our clients' success.",
  about_stats: [
    { value: "200+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Team Members" },
    { value: "15+", label: "Countries Served" },
  ],
  about_values: [
    { icon: "Target", title: "Results-Driven", description: "We focus on delivering measurable outcomes that directly impact your bottom line." },
    { icon: "Heart", title: "Client-First", description: "Your success is our priority. We build partnerships based on trust and transparency." },
    { icon: "Zap", title: "Innovation", description: "We stay at the forefront of technology, constantly exploring new solutions." },
    { icon: "Award", title: "Excellence", description: "We hold ourselves to the highest standards in every project we deliver." },
  ],
  about_team: [
    { name: "Alex Thompson", role: "Founder & CEO", expertise: "Strategy & Vision" },
    { name: "Sarah Chen", role: "Creative Director", expertise: "Design & Branding" },
    { name: "Marcus Johnson", role: "Tech Lead", expertise: "Development & Architecture" },
    { name: "Emily Rodriguez", role: "SEO Director", expertise: "Search & Analytics" },
  ],
  
  contact_hero_title: "Let's Start a Conversation",
  contact_hero_description: "Have a question or want to discuss a project? We would love to hear from you. Reach out and our team will get back to you within 24 hours.",
  contact_email: "contact@nexusagency.com",
  contact_phone: "+1 (234) 567-890",
  contact_address: "123 Business Avenue, San Francisco, CA 94102",
  contact_hours: "Monday - Friday, 9:00 AM - 6:00 PM PST",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<PageContent>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("site_settings")
        .select("*");

      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      if (data && data.length > 0) {
        const settingsMap: PageContent = { ...defaultSettings };
        data.forEach((setting) => {
          const key = setting.key as keyof PageContent;
          settingsMap[key] = setting.value as any;
        });
        setSettings(settingsMap);
      }
    } catch (err) {
      setError("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();

    // Set up real-time subscription for live updates
    const channel = supabase
      .channel("site-settings-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_settings",
        },
        () => {
          // Refetch all settings on any change
          fetchSettings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSettings]);

  return { settings, loading, error, refetch: fetchSettings };
}

// Hook for admin to update settings
export function useUpdateSiteSettings() {
  const [saving, setSaving] = useState(false);

  const updateSetting = async (key: string, value: any): Promise<boolean> => {
    setSaving(true);
    try {
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .eq("key", key)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value, updated_at: new Date().toISOString() })
          .eq("key", key);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("site_settings")
          .insert([{ key, value }]);
        
        if (error) throw error;
      }
      
      return true;
    } catch (err) {
      console.error("Failed to update setting:", err);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateMultipleSettings = async (updates: Record<string, any>): Promise<boolean> => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(updates)) {
        const { data: existing } = await supabase
          .from("site_settings")
          .select("id")
          .eq("key", key)
          .maybeSingle();

        if (existing) {
          await supabase
            .from("site_settings")
            .update({ value, updated_at: new Date().toISOString() })
            .eq("key", key);
        } else {
          await supabase
            .from("site_settings")
            .insert([{ key, value }]);
        }
      }
      
      return true;
    } catch (err) {
      console.error("Failed to update settings:", err);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { updateSetting, updateMultipleSettings, saving };
}
