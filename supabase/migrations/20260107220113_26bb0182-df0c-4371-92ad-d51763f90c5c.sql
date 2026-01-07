-- Fix function search paths
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.create_notification() CASCADE;

-- Recreate with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
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

-- Recreate triggers
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON public.service_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_team_applications_updated_at BEFORE UPDATE ON public.team_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_service_request_created
  AFTER INSERT ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION public.create_notification();

CREATE TRIGGER on_team_application_created
  AFTER INSERT ON public.team_applications
  FOR EACH ROW EXECUTE FUNCTION public.create_notification();