-- ==================================================
-- SEED DATA TABLES
-- Dados iniciais para as tabelas do banco de dados
-- ⚠️ Apenas para desenvolvimento/teste
-- ==================================================

-- Limpa todos os dados e reinicia as sequências
TRUNCATE TABLE
    public."user"
RESTART IDENTITY CASCADE;
-- ──────────────────────────────────────────────
-- USUARIOS (4 registros)
-- Senhas em bcrypt — plaintext: "senha@123"
-- ──────────────────────────────────────────────
INSERT INTO public."user"(id, name, email, password_hash, role)
  OVERRIDING SYSTEM VALUE VALUES 
	(1,"Sheclock Holmes",	"sherlock@teste.com",	"$2b$10$MthJ5LI1NcHTyjlBMs2Hpuslrn114vSiPP9qorDJYw8y8/GAhHxNi",	"ADMIN"),
  (2,"Harry Potter",	  "harry@teste.com",	  "$2b$10$ZO28zdg7nHJqOjnqeRImfeFPXvT9aG6Z6pFSokBD6Yh/fcBlF4YE.",	"ATTENDANT"),
  (3,"James Bond",	    "bond@teste.com",	    "$2b$10$Fn5TwPw4Gx.XULrsF4OLAOf21n8Js2qx42Ho8Zl2LudMtLJo4JP6a",	"ATTENDANT"),
	(4,"Tony Stark",	    "tony@teste.com",	    "$2b$10$tkaVeXX6Pb0aLLQkl4pdqO2S8vn5PTIjMmrW6dJp30/Mrqo1FFJfm",	"ATTENDANT");