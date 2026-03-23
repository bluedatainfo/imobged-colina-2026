ALTER TABLE public.property_documents ADD COLUMN IF NOT EXISTS review_notes TEXT;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS review_notes TEXT;
