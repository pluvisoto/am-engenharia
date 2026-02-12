-- LIMPAR USUÁRIOS DE TESTE E RECOMEÇAR

-- 1. Ver todos os usuários criados no Auth
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;

-- 2. Ver todas as empresas cadastradas
SELECT id, name, email, cnpj, user_id, created_at
FROM companies
ORDER BY created_at DESC;

-- 3. DELETAR USUÁRIOS DE TESTE (substitua os emails pelos seus testes)
-- CUIDADO: Isso vai deletar permanentemente!

-- Deletar por email específico:
DELETE FROM auth.users WHERE email = 'pluvisoto@gmail.com';
DELETE FROM auth.users WHERE email = 'paulo@recupera.ia.br';

-- OU deletar usuários sem empresa vinculada:
DELETE FROM auth.users 
WHERE id NOT IN (
    SELECT user_id FROM companies WHERE user_id IS NOT NULL
);

-- 4. Limpar empresas órfãs também
DELETE FROM companies WHERE user_id IS NULL;

-- 5. VERIFICAR LIMPEZA
SELECT 'Users:', COUNT(*) FROM auth.users;
SELECT 'Companies:', COUNT(*) FROM companies;
