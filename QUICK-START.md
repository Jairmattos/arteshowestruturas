# 🚀 Guia Rápido: Sistema de E-mail

## O que foi implementado

✅ Servidor backend com Node.js + Express  
✅ Envio de emails via SMTP usando Nodemailer  
✅ Email para vendas + cópia para logística  
✅ Email de confirmação para o cliente  
✅ Formulário de contato integrado  

## Setup Rápido (5 minutos)

### 1. Conseguir credenciais Gmail

1. Acesse: https://myaccount.google.com
2. Menu > Segurança
3. Ative "Autenticação em 2 etapas" (se não estiver)
4. Acesse: https://myaccount.google.com/apppasswords
5. Selecione: Mail → Windows Computer
6. Copie a senha de 16 caracteres

### 2. Adicionar ao arquivo `.env`

Abra `c:\Notebook Anterior\JAIR\Site Novo\app\.env` e configure:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
PORT=3001
```

⚠️ **Substitua:**
- `seu-email@gmail.com` pelo seu Gmail
- `xxxx-xxxx-xxxx-xxxx` pela senha de 16 caracteres

### 3. Rodar o sistema

```bash
npm run dev-full
```

Isso abre:
- 🌐 Frontend: http://localhost:5173
- 📧 Servidor: http://localhost:3001

### 4. Testar

1. Abra http://localhost:5173
2. Vá até "Contato"
3. Preencha e envie
4. Confira os 3 emails:
   - vendas@arteshowestruturas.com.br
   - logistica@arteshowestruturas.com.br
   - Email do cliente (confirmação)

## Troubleshooting

| Erro | Solução |
|------|---------|
| "Erro de conexão" | Certifique-se que `npm run dev-full` está rodando |
| Gmail rejeita | Gere nova senha de app em https://myaccount.google.com/apppasswords |
| Sem internet | Configure firewall/proxy se necessário |

## Documentação Completa

Para mais detalhes, veja: `EMAIL-SETUP.md`

## Próximas etapas (Opcional)

- [ ] Usar `sendgrid` para maior volume
- [ ] Adicionar captcha ao formulário
- [ ] Guardar histórico em banco de dados
- [ ] Deploy em servidor dedicado
