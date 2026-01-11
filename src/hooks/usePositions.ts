import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Position = Tables<"positions">;

export function usePositions() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPositions() {
      const { data, error: fetchError } = await supabase
        .from("positions")
        .select("*")
        .eq("is_open", true)
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setPositions(data || []);
      }
      setLoading(false);
    }

    fetchPositions();

    // Set up real-time subscription for live updates
    const channel = supabase
      .channel("positions-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "positions",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newPosition = payload.new as Position;
            if (newPosition.is_open) {
              setPositions((prev) => [newPosition, ...prev]);
            }
          } else if (payload.eventType === "UPDATE") {
            const updatedPosition = payload.new as Position;
            setPositions((prev) => {
              if (!updatedPosition.is_open) {
                return prev.filter((p) => p.id !== updatedPosition.id);
              }
              const exists = prev.some((p) => p.id === updatedPosition.id);
              if (exists) {
                return prev.map((p) => (p.id === updatedPosition.id ? updatedPosition : p));
              } else {
                return [updatedPosition, ...prev];
              }
            });
          } else if (payload.eventType === "DELETE") {
            const deletedPosition = payload.old as Position;
            setPositions((prev) => prev.filter((p) => p.id !== deletedPosition.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { positions, loading, error };
}
