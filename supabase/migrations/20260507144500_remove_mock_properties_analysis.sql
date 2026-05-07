-- Remove mock test data specifically from Análise Gerencial to reset the Manager Approval tabs
DELETE FROM public.properties WHERE status = 'Análise Gerencial';
