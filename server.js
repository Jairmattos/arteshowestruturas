import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configurar transporte de email
// Você precisa configurar com suas credenciais SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true' || false,
  auth: {
    user: process.env.SMTP_USER || 'seu-email@gmail.com',
    pass: process.env.SMTP_PASS || 'sua-senha-app'
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, company, email, phone, projectType, message } = req.body;

    // Validação básica
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    // Template do email
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #B8FF3D 0%, #a8ef2d 100%); padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #0B0C0E; margin: 0; font-size: 24px;">Nova Solicitação de Orçamento</h1>
        </div>
        <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="margin: 0 0 20px 0; color: #333;"><strong>Cliente:</strong> ${name}</p>
          <p style="margin: 0 0 20px 0; color: #333;"><strong>Empresa:</strong> ${company || 'Não informado'}</p>
          <p style="margin: 0 0 20px 0; color: #333;"><strong>E-mail:</strong> ${email}</p>
          <p style="margin: 0 0 20px 0; color: #333;"><strong>Telefone:</strong> ${phone}</p>
          <p style="margin: 0 0 20px 0; color: #333;"><strong>Tipo de Projeto:</strong> ${projectType || 'Não especificado'}</p>
          
          <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Descrição do Projeto:</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message || 'Sem descrição'}</p>
          </div>

          <div style="background: #fff; padding: 15px; border-radius: 4px; margin-top: 20px; border-left: 4px solid #B8FF3D;">
            <p style="margin: 0; color: #666; font-size: 12px;">
              <strong>Informações do cliente para contato:</strong><br>
              E-mail: ${email}<br>
              Telefone: ${phone}
            </p>
          </div>
        </div>
      </div>
    `;

    // Email para vendas
    const vendoresEmail = {
      from: `"Orçamento via Site" <${process.env.SMTP_USER || 'noreply@arteshowestruturas.com.br'}>`,
      replyTo: email,
      to: 'vendas@arteshowestruturas.com.br',
      cc: 'logistica@arteshowestruturas.com.br',
      subject: `Novo Orçamento: ${name}`,
      html: htmlTemplate
    };

    // Email de confirmação para o cliente
    const clienteEmail = {
      from: `"ArteShow - Orçamento" <${process.env.SMTP_USER || 'noreply@arteshowestruturas.com.br'}>`,
      to: email,
      subject: 'Recebemos sua solicitação de orçamento','
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #B8FF3D 0%, #a8ef2d 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #0B0C0E; margin: 0; font-size: 24px;">Obrigado, ${name}!</h1>
          </div>
          <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="color: #333; margin-bottom: 20px;">Recebemos sua solicitação de orçamento com sucesso.</p>
            
            <p style="color: #333; margin-bottom: 20px;">
              Nossa equipe comercial analisará seu projeto e entrará em contato em até <strong>24 horas</strong> com uma proposta personalizada.
            </p>

            <div style="background: #fff; padding: 20px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #B8FF3D;">
              <h3 style="color: #0B0C0E; margin-top: 0;">Se preferir entrar em contato antes:</h3>
              <p style="margin: 5px 0; color: #666;">
                <strong>Telefone:</strong> (47) 3438-3468<br>
                <strong>WhatsApp:</strong> (47) 99745-4054<br>
                <strong>E-mail:</strong> vendas@arteshowestruturas.com.br
              </p>
            </div>

            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              ArteShow Estruturas em Alumínio<br>
              Rua Antônio Amorim, 741 - Porto Grande, Araquari - SC<br>
              www.arteshowestruturas.com.br
            </p>
          </div>
        </div>
      `
    };

    // Enviar emails
    await transporter.sendMail(vendoresEmail);
    await transporter.sendMail(clienteEmail);

    res.json({ success: true, message: 'Formulário enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ error: 'Erro ao enviar formulário. Tente novamente mais tarde.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de contato rodando em http://localhost:${PORT}`);
});
