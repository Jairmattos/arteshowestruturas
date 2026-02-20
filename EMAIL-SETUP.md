# 📧 Configuração do Sistema de E-mail

## Overview

O sistema de contato do site está configurado para enviar emails reais para:
- **vendas@arteshowestruturas.com.br** - Recebe todas as solicitações
- **logistica@arteshowestruturas.com.br** - Recebe cópia de todas as solicitações

O cliente também recebe um email de confirmação.

## Configuração

### 1. Criar arquivo `.env`

Na pasta raiz do projeto, crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

### 2. Configurar Credenciais SMTP

#### Opção A: Gmail (Recomendado - Gratuito)

1. Acesse sua conta Google: https://myaccount.google.com
2. Vá para "Segurança" (ou faça login)
3. Ative "Autenticação em duas etapas"
4. Acesse https://myaccount.google.com/apppasswords
5. Selecione "Mail" e "Windows Computer"
6. Copie a senha de 16 caracteres gerada
7. Configure no `.env`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=aaaa-bbbb-cccc-dddd
```

#### Opção B: Outro provedor SMTP

Use as credenciais do seu provedor:
- Gmail: `smtp.gmail.com:587`
- Outlook: `smtp-mail.outlook.com:587`
- Yahoo: `smtp.mail.yahoo.com:465`
- Seu servidor: Peça as credenciais

### 3. Instalar Dependências

As dependências já estão instaladas. Se precisar reinstalar:

```bash
npm install
```

## Rodando o Sistema

### Desenvolvimento

**Opção 1: Rodar tudo junto** (Recomendado)
```bash
npm run dev-full
```

Isso vai rodar:
- ✅ Servidor de contato na porta 3001
- ✅ Frontend Vite na porta 5173

**Opção 2: Rodar separadamente**

Terminal 1:
```bash
npm run server
```

Terminal 2:
```bash
npm run dev
```

### Produção

```bash
npm run build
# E depois rodar o server:
npm run server
```

## URLs

- Frontend: http://localhost:5173
- API de Contato: http://localhost:3001/api/contact

## Testando

1. Abra o site em http://localhost:5173
2. Vá até a seção "Contato"
3. Preencha o formulário
4. Clique em "Enviar solicitação"
5. Verifique os emails em:
   - vendas@arteshowestruturas.com.br
   - logistica@arteshowestruturas.com.br
   - No email do cliente (confirmação)

## Troubleshooting

### "Erro de conexão. Verifique se o servidor está rodando."

- Certifique-se de que o servidor está rodando na porta 3001
- Verifique se há erro no console do servidor
- Tente acessar http://localhost:3001 no navegador (deve receber erro 404, o que é normal)

### "Erro ao enviar email"

- Verifique as credenciais SMTP no `.env`
- Se usar Gmail, certifique-se de que ativou "Autenticação em duas etapas" e gerou a senha de app
- Verifique se o servidor tem acesso à internet
- Confira se a porta SMTP está correta (587 para TLS, 465 para SSL)

### Gmail rejeitando credenciais

- Gere uma nova "senha de app": https://myaccount.google.com/apppasswords
- Certifique-se de que copiou os 16 caracteres corretamente (sem espaços)
- Se for a primeira vez, aguarde alguns minutos para o Gmail reconhecer

## Segurança

⚠️ **IMPORTANTE:**
- Nunca comita o arquivo `.env` no Git
- O `.env` está no `.gitignore` por padrão
- Nunca compartilhe suas credenciais SMTP
- Use senhas de app ao invés de senhas principais

## Próximos Passos

1. **Deploy**: Ao fazer deploy, atualize também o `API_URL` para apontar para o seu servidor de produção
2. **Rate Limiting**: Adicionar limite de requisições por IP
3. **Validação**: Adicionar captcha (reCAPTCHA)
4. **Banco de Dados**: Opcional - guardar histórico de contatos em um banco de dados

## Contato

Para dúvidas sobre a configuração, entre em contato!
