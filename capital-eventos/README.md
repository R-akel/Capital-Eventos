# Capital Eventos

Aplicação React com Vite para explorar eventos. O cadastro usa uma API PHP e um banco MySQL durante o desenvolvimento local.

## Cadastro local com PHP e MySQL

1. Instale o [XAMPP](https://www.apachefriends.org/) e inicie o serviço **MySQL** pelo painel de controle. O PHP do XAMPP será usado para executar a API.
2. No phpMyAdmin (`http://localhost/phpmyadmin`), importe `backend/database.sql`. Isso cria o banco `capital eventos` e a tabela `usuarios`. Se você já criou esse banco, pode selecionar ele e executar o SQL de criação da tabela diretamente.
3. Abra um terminal na pasta `capital-eventos` e inicie a API:

   ```powershell
   C:\xampp\php\php.exe -S 127.0.0.1:8000 -t backend\public
   ```

   Se o XAMPP estiver instalado em outro local, ajuste o caminho para `php.exe`. A configuração padrão da API é `127.0.0.1`, banco `capital eventos`, usuário `root` e senha vazia. Se suas credenciais forem diferentes, configure as variáveis de ambiente `DB_HOST`, `DB_NAME`, `DB_USER` e `DB_PASSWORD` antes de iniciar o servidor PHP.
4. Em outro terminal, inicie o site:

   ```powershell
   npm install
   npm run dev
   ```

5. Abra o endereço mostrado pelo Vite (normalmente `http://localhost:5173`) e faça um cadastro. Os usuários ficam na tabela `usuarios`; a senha é salva como hash, nunca em texto puro.

Esta configuração é somente para desenvolvimento local. O login ainda é simulado e a API de cadastro deve ser publicada em uma hospedagem com PHP antes de ser usada pelo site publicado.
