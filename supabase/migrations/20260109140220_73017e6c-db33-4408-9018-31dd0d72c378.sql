-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "System can insert notifications" ON public.admin_notifications;

-- Create a new secure INSERT policy that only allows service_role
-- This ensures only database triggers (which run as service_role via SECURITY DEFINER) can insert
CREATE POLICY "Only system can insert notifications" 
ON public.admin_notifications 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');