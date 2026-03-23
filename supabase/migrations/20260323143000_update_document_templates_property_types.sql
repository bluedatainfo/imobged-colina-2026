DO $$ 
BEGIN
    UPDATE public.document_templates SET property_type = 'Apartamento' WHERE property_type = 'Residencial';
    UPDATE public.document_templates SET property_type = 'Ponto Comercial' WHERE property_type = 'Comercial';
    UPDATE public.document_templates SET property_type = 'Galpão' WHERE property_type = 'Industrial';
END $$;
