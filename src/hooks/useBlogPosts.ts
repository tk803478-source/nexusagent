import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type BlogPost = Tables<"blog_posts">;

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error: fetchError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }

    fetchPosts();

    // Set up real-time subscription for live updates
    const channel = supabase
      .channel("blog-posts-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blog_posts",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newPost = payload.new as BlogPost;
            if (newPost.is_published) {
              setPosts((prev) => [newPost, ...prev]);
            }
          } else if (payload.eventType === "UPDATE") {
            const updatedPost = payload.new as BlogPost;
            setPosts((prev) => {
              if (!updatedPost.is_published) {
                // Remove if unpublished
                return prev.filter((p) => p.id !== updatedPost.id);
              }
              const exists = prev.some((p) => p.id === updatedPost.id);
              if (exists) {
                return prev.map((p) => (p.id === updatedPost.id ? updatedPost : p));
              } else {
                // Add if newly published
                return [updatedPost, ...prev];
              }
            });
          } else if (payload.eventType === "DELETE") {
            const deletedPost = payload.old as BlogPost;
            setPosts((prev) => prev.filter((p) => p.id !== deletedPost.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { posts, loading, error };
}
