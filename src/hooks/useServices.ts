import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Service = Tables<"services">;

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      const { data, error: fetchError } = await supabase
        .from("services")
        .select("*")
        .eq("status", "active")
        .order("display_order");

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setServices(data || []);
      }
      setLoading(false);
    }

    fetchServices();

    // Set up real-time subscription for live updates
    const channel = supabase
      .channel("services-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "services",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newService = payload.new as Service;
            if (newService.status === "active") {
              setServices((prev) => 
                [...prev, newService].sort((a, b) => 
                  (a.display_order || 0) - (b.display_order || 0)
                )
              );
            }
          } else if (payload.eventType === "UPDATE") {
            const updatedService = payload.new as Service;
            setServices((prev) => {
              if (updatedService.status !== "active") {
                // Remove if no longer active
                return prev.filter((s) => s.id !== updatedService.id);
              }
              // Check if it already exists
              const exists = prev.some((s) => s.id === updatedService.id);
              if (exists) {
                return prev
                  .map((s) => (s.id === updatedService.id ? updatedService : s))
                  .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
              } else {
                // Add if newly activated
                return [...prev, updatedService].sort((a, b) => 
                  (a.display_order || 0) - (b.display_order || 0)
                );
              }
            });
          } else if (payload.eventType === "DELETE") {
            const deletedService = payload.old as Service;
            setServices((prev) => prev.filter((s) => s.id !== deletedService.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { services, loading, error };
}
