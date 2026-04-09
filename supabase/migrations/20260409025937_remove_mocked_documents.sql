-- Remove mock documents to ensure only real uploaded files are listed
DELETE FROM public.property_documents
WHERE file_path IS NULL OR file_path = '';
