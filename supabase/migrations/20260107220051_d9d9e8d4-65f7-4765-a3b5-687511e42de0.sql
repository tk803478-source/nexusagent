-- Create enum types
CREATE TYPE public.service_status AS ENUM ('active', 'inactive');
CREATE TYPE public.order_status AS ENUM ('submitted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.application_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  price_from DECIMAL(10,2),
  price_type TEXT DEFAULT 'starting_from',
  icon TEXT,
  status service_status DEFAULT 'active',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Client service requests
CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  company_name TEXT,
  requirements TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  files_url TEXT,
  status order_status DEFAULT 'submitted',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Team positions
CREATE TABLE public.positions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  is_open BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Team applications
CREATE TABLE public.team_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  position_id UUID REFERENCES public.positions(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  skills TEXT NOT NULL,
  portfolio_url TEXT,
  linkedin_url TEXT,
  message TEXT,
  resume_url TEXT,
  status application_status DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT DEFAULT 'Nexus Team',
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Admin notifications
CREATE TABLE public.admin_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  reference_id UUID,
  reference_type TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Site settings
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Public read policies for public content
CREATE POLICY "Services are publicly readable" ON public.services FOR SELECT USING (status = 'active');
CREATE POLICY "Admins can manage services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Published blog posts are publicly readable" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Open positions are publicly readable" ON public.positions FOR SELECT USING (is_open = true);
CREATE POLICY "Admins can manage positions" ON public.positions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can submit service requests
CREATE POLICY "Anyone can submit service requests" ON public.service_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all service requests" ON public.service_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update service requests" ON public.service_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can submit team applications
CREATE POLICY "Anyone can submit team applications" ON public.team_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all team applications" ON public.team_applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update team applications" ON public.team_applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin notifications
CREATE POLICY "Admins can view notifications" ON public.admin_notifications FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage notifications" ON public.admin_notifications FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "System can insert notifications" ON public.admin_notifications FOR INSERT WITH CHECK (true);

-- User roles policies
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Site settings
CREATE POLICY "Site settings are publicly readable" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON public.service_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_team_applications_updated_at BEFORE UPDATE ON public.team_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to create notification
CREATE OR REPLACE FUNCTION public.create_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF TG_TABLE_NAME = 'service_requests' THEN
    INSERT INTO public.admin_notifications (type, title, message, reference_id, reference_type)
    VALUES ('service_request', 'New Service Request', 'New request from ' || NEW.client_name || ' for service', NEW.id, 'service_request');
  ELSIF TG_TABLE_NAME = 'team_applications' THEN
    INSERT INTO public.admin_notifications (type, title, message, reference_id, reference_type)
    VALUES ('team_application', 'New Team Application', NEW.full_name || ' applied for a position', NEW.id, 'team_application');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_service_request_created
  AFTER INSERT ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION public.create_notification();

CREATE TRIGGER on_team_application_created
  AFTER INSERT ON public.team_applications
  FOR EACH ROW EXECUTE FUNCTION public.create_notification();

-- Insert default services
INSERT INTO public.services (name, slug, short_description, description, price_from, icon, display_order) VALUES
('Web Development', 'web-development', 'Custom websites and web applications built with modern technologies.', 'Transform your digital presence with our expert web development services. We specialize in creating responsive, high-performance websites and web applications using the latest technologies including React, Next.js, and modern backend solutions. Our team delivers scalable solutions that grow with your business, from simple landing pages to complex enterprise applications.', 999, 'Globe', 1),
('SEO Optimization', 'seo-optimization', 'Boost your search rankings and drive organic traffic.', 'Elevate your online visibility with our comprehensive SEO services. We employ data-driven strategies to improve your search engine rankings, increase organic traffic, and maximize your ROI. Our approach includes technical SEO audits, keyword research, content optimization, and link building strategies tailored to your industry and target audience.', 499, 'Search', 2),
('Video Production', 'video-production', 'Professional video editing and production services.', 'Captivate your audience with professional video content. Our video production team creates compelling visual stories that engage viewers and drive results. From promotional videos and social media content to full-scale commercial productions, we handle every aspect of the video creation process with creativity and precision.', 799, 'Video', 3),
('AI Solutions', 'ai-solutions', 'Intelligent automation and AI-powered tools for your business.', 'Harness the power of artificial intelligence to transform your business operations. We develop custom AI solutions including chatbots, automation workflows, data analysis tools, and machine learning models. Our AI services help you streamline processes, enhance customer experiences, and gain competitive advantages in your market.', 1499, 'Bot', 4);

-- Insert default positions
INSERT INTO public.positions (title, department, description, requirements, is_open) VALUES
('Full Stack Developer', 'Engineering', 'Build and maintain scalable web applications', 'Experience with React, Node.js, databases', true),
('UI/UX Designer', 'Design', 'Create beautiful and intuitive user interfaces', 'Proficiency in Figma, understanding of UX principles', true),
('Video Editor', 'Creative', 'Edit and produce engaging video content', 'Experience with Premiere Pro, After Effects', true),
('Virtual Assistant', 'Operations', 'Provide administrative support to clients', 'Excellent communication, organizational skills', true);

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, author, tags, is_published, published_at) VALUES
('The Future of Web Development in 2025', 'future-of-web-development-2025', 'Discover the latest trends shaping the web development landscape and how your business can stay ahead of the curve.', '# The Future of Web Development in 2025

The web development landscape is evolving rapidly, bringing new technologies, frameworks, and methodologies that are transforming how we build digital experiences. In this comprehensive guide, we explore the key trends that will shape the industry in 2025 and beyond.

## AI-Powered Development

Artificial intelligence is revolutionizing how developers write code. From intelligent code completion to automated testing, AI tools are becoming indispensable in modern development workflows. These advancements not only speed up development but also improve code quality and reduce bugs.

## The Rise of Edge Computing

Edge computing is moving processing closer to users, resulting in faster load times and improved user experiences. Technologies like edge functions are enabling developers to build globally distributed applications that perform consistently across all regions.

## Component-Based Architecture

The shift towards component-based development continues to accelerate. Modern frameworks like React, Vue, and Svelte are making it easier than ever to build reusable, maintainable code. This approach reduces development time and ensures consistency across large applications.

## Performance as a Priority

Core Web Vitals and performance metrics are now critical ranking factors. Developers are focusing more on optimization techniques, including lazy loading, code splitting, and efficient caching strategies to deliver lightning-fast experiences.

## Conclusion

Staying current with these trends is essential for businesses looking to maintain a competitive edge in the digital landscape. By embracing new technologies and best practices, you can build faster, more reliable, and more engaging web experiences for your users.', 'Nexus Team', ARRAY['Web Development', 'Technology', 'Trends'], true, now()),

('How SEO Can Transform Your Business Growth', 'seo-transform-business-growth', 'Learn proven SEO strategies that can dramatically increase your organic traffic and lead generation.', '# How SEO Can Transform Your Business Growth

Search Engine Optimization remains one of the most powerful and cost-effective marketing strategies available to businesses of all sizes. When implemented correctly, SEO can deliver sustainable, long-term growth that compounds over time.

## Understanding the SEO Foundation

Before diving into advanced tactics, it is essential to understand the core principles that search engines use to rank websites. These include relevance, authority, and user experience. By optimizing for these factors, you create a solid foundation for success.

## Keyword Research and Strategy

Effective keyword research is the cornerstone of any successful SEO campaign. By understanding what your target audience is searching for, you can create content that directly addresses their needs and questions. This targeted approach ensures your efforts are focused on terms that drive qualified traffic.

## Technical SEO Excellence

The technical aspects of your website play a crucial role in how search engines crawl and index your content. Site speed, mobile responsiveness, structured data, and clean code architecture all contribute to better rankings and user experiences.

## Content That Converts

Creating high-quality, valuable content is essential for SEO success. But content should not just attract visitors—it should guide them through your sales funnel. Strategic content planning ensures every piece serves a purpose in your overall marketing strategy.

## Building Authority Through Links

Backlinks from reputable websites signal to search engines that your content is valuable and trustworthy. A strategic link-building approach focuses on earning links naturally through exceptional content and meaningful relationships.

## Measuring and Optimizing Results

SEO is not a set-it-and-forget-it strategy. Regular monitoring and analysis of your performance metrics allow you to identify opportunities and refine your approach for continuous improvement.

## Taking Action

The best time to start investing in SEO is now. The sooner you begin building your organic presence, the sooner you will see results. Our team can help you develop and execute a comprehensive SEO strategy tailored to your business goals.', 'Nexus Team', ARRAY['SEO', 'Marketing', 'Business Growth'], true, now())