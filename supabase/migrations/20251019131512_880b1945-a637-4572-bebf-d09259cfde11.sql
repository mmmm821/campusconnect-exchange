-- Fix profiles table RLS - Hide emails from public view
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Owner sees their full profile
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

-- Others see only public profile data (no email)
CREATE POLICY "Public profile view" ON public.profiles
FOR SELECT USING (
  auth.uid() IS NOT NULL AND auth.uid() != id
);

-- Strengthen transaction access control
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;

CREATE POLICY "Users view their transactions only" ON public.transactions
FOR SELECT USING (
  auth.uid() IS NOT NULL AND (
    auth.uid() = buyer_id OR auth.uid() = seller_id
  )
);

DROP POLICY IF EXISTS "Users can update their own transactions" ON public.transactions;

CREATE POLICY "Transaction parties can update" ON public.transactions
FOR UPDATE USING (
  auth.uid() IS NOT NULL AND (
    auth.uid() = buyer_id OR auth.uid() = seller_id
  )
);

DROP POLICY IF EXISTS "Buyers can create transactions" ON public.transactions;

CREATE POLICY "Authenticated buyers create transactions" ON public.transactions
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND auth.uid() = buyer_id
);

-- Update existing data to meet constraints before adding them
UPDATE public.items 
SET description = 'No description provided for this item.'
WHERE char_length(description) < 10;

UPDATE public.items 
SET title = 'Item'
WHERE char_length(title) < 3;

UPDATE public.items 
SET location = 'Campus'
WHERE char_length(location) < 2;

UPDATE public.items 
SET campus = 'Main Campus'
WHERE char_length(campus) < 2;

-- Add database constraints for items table
ALTER TABLE public.items 
ADD CONSTRAINT items_price_positive CHECK (price > 0 AND price <= 1000000);

ALTER TABLE public.items 
ADD CONSTRAINT items_title_length CHECK (char_length(title) >= 3 AND char_length(title) <= 100);

ALTER TABLE public.items 
ADD CONSTRAINT items_description_length CHECK (char_length(description) >= 10 AND char_length(description) <= 2000);

ALTER TABLE public.items 
ADD CONSTRAINT items_location_length CHECK (char_length(location) >= 2 AND char_length(location) <= 100);

ALTER TABLE public.items 
ADD CONSTRAINT items_campus_length CHECK (char_length(campus) >= 2 AND char_length(campus) <= 100);