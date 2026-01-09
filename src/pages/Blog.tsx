import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Calendar, User } from "lucide-react";
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
  published_at: string | null;
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary">
        <div className="container-wide text-center text-primary-foreground">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
            Our Blog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Insights & Resources
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Expert articles, industry insights, and practical guides to help you 
            navigate the digital landscape and grow your business.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding bg-background">
          <div className="container-wide">
            <Link 
              to={`/blog/${featuredPost.slug}`}
              className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center card-interactive p-6 md:p-8"
            >
              <div className="aspect-video rounded-xl bg-primary/5 flex items-center justify-center overflow-hidden">
                {featuredPost.cover_image ? (
                  <img 
                    src={featuredPost.cover_image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-primary text-6xl font-display font-bold">N</div>
                )}
              </div>
              
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Featured Article
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredPost.excerpt || featuredPost.content.substring(0, 200) + '...'}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{featuredPost.author || 'Nexus Team'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>
                      {featuredPost.published_at 
                        ? format(new Date(featuredPost.published_at), 'MMM dd, yyyy')
                        : format(new Date(featuredPost.created_at), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-primary font-medium">
                  Read Article
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-elevated p-6 animate-pulse">
                  <div className="aspect-video rounded-lg bg-muted mb-4" />
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : otherPosts.length > 0 ? (
            <>
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Latest Articles
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group card-interactive overflow-hidden"
                  >
                    <div className="aspect-video bg-primary/5 flex items-center justify-center overflow-hidden">
                      {post.cover_image ? (
                        <img 
                          src={post.cover_image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-primary text-4xl font-display font-bold">N</div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt || post.content.substring(0, 100) + '...'}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{post.author || 'Nexus Team'}</span>
                        <span>
                          {post.published_at 
                            ? format(new Date(post.published_at), 'MMM dd, yyyy')
                            : format(new Date(post.created_at), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : posts.length === 0 && !loading ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Coming Soon
              </h2>
              <p className="text-muted-foreground mb-8">
                We are working on creating valuable content for you. Check back soon!
              </p>
              <Button asChild>
                <Link to="/">
                  Return Home
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-background">
        <div className="container-tight text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Get the latest insights delivered straight to your inbox. 
            Join our community of forward-thinking business leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="lg">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </Layout>
  );
}
