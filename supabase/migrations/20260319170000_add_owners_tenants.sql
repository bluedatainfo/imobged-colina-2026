CREATE TABLE public.owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    cpf TEXT,
    rg TEXT,
    full_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    cpf TEXT,
    rg TEXT,
    full_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Owners
ALTER TABLE public.owners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_all_owners" ON public.owners
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS Tenants
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_all_tenants" ON public.tenants
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
