-- Migration: Adicionar coluna callmebot_api_key na tabela app_users
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS callmebot_api_key TEXT;
