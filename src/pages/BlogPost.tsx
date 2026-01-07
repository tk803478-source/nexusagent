import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, User, Tag, Share2, Linkedin, Twitter } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error || !data) {
        navigate('/blog');
        return;
      }

      setPost(data);
      setLoading(false);

      // Update document title for SEO
      document.title = data.meta_title || data.title + ' | Nexus Digital Agency';
    }

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="pt-32 pb-16 container-wide animate-pulse">
          <div className="max-w-3xl mx-auto">
            <div className="h-8 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-1/2 mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) return null;

  const shareUrl = window.location.href;
  const shareText = post.title;

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </Link>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author || 'Nexus Team'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>
                  {post.published_at 
                    ? format(new Date(post.published_at), 'MMMM dd, yyyy')
                    : format(new Date(post.created_at), 'MMMM dd, yyyy')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover_image && (
        <section className="pb-8 bg-background">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img 
                  src={post.cover_image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section-padding bg-background pt-8">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <article className="prose-agency">
              {/* Render markdown-style content */}
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index}>{paragraph.slice(2)}</h1>;
                } else if (paragraph.startsWith('## ')) {
                  return <h2 key={index}>{paragraph.slice(3)}</h2>;
                } else if (paragraph.startsWith('### ')) {
                  return <h3 key={index}>{paragraph.slice(4)}</h3>;
                } else if (paragraph.startsWith('- ')) {
                  return <li key={index}>{paragraph.slice(2)}</li>;
                } else if (paragraph.trim() === '') {
                  return null;
                } else {
                  return <p key={index}>{paragraph}</p>;
                }
              })}
            </article>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Share this article</span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 rounded-2xl" style={{ background: 'var(--gradient-hero)' }}>
              <div className="text-center text-primary-foreground">
                <h3 className="text-2xl font-display font-bold mb-4">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-primary-foreground/80 mb-6">
                  Let our team help you achieve your digital goals.
                </p>
                <Button variant="hero" asChild>
                  <Link to="/hire-us">
                    Get Started Today
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
