import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Send, Instagram, MessageCircle, Check, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Endereço',
    content: 'Rua Antônio Amorim, 741',
    subContent: 'Porto Grande, Araquari - SC, 89245-000'
  },
  {
    icon: Phone,
    title: 'Telefone',
    content: '(47) 3438-3468',
    subContent: 'Segunda a Sexta, 08 às 17h'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    content: '(47) 99745-4054',
    subContent: 'Atendimento rápido'
  },
  {
    icon: Mail,
    title: 'E-mail',
    content: 'administrativo@arteshowestruturas.com.br',
    subContent: 'Resposta em até 24h'
  }
];

const team = [
  { name: 'Carlos Timóteo', role: 'Comercial', phone: '(47) 9647-2896', image: '/images/CARLOS.png' },
  { name: 'Aryane Silva', role: 'Comercial', phone: '(47) 9158-5403', image: '/images/ARYANE.png' },
  { name: 'Felix', role: 'Comercial', phone: '(47) 9237-5210', image: '/images/FELIX.png' },
  { name: 'Regina', role: 'Comercial', phone: '(47) 9256-8186', image: '/images/REGINA.png' },
  { name: 'Marli', role: 'Gerente Comercial', phone: '(47) 8482-5773', image: '/images/MARLI.png' }
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({
            name: '',
            company: '',
            email: '',
            phone: '',
            projectType: '',
            message: ''
          });
        }, 3000);
      } else {
        alert('Erro ao enviar formulário. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão. Verifique se o servidor está rodando.');
    }
  };

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full section-dark"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="reveal micro-label text-[#B8FF3D] mb-4 block">
              Entre em Contato
            </span>
            <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Vamos montar seu próximo{' '}
              <span className="accent-text">projeto</span>
            </h2>
            <p className="reveal text-[#A6AAB6] text-lg max-w-2xl mx-auto">
              Envie os dados do evento. Nossa equipe responde em até 24h 
              com uma proposta personalizada.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Info & Map */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="reveal-left bg-[#0f1014] border border-[#1a1b1f] p-5 rounded-lg hover:border-[#B8FF3D]/30 transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 bg-[#B8FF3D]/10 rounded-lg flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-[#B8FF3D]" />
                    </div>
                    <h3 className="font-semibold text-[#F6F7F9] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#F6F7F9]">{item.content}</p>
                    <p className="text-xs text-[#A6AAB6]">{item.subContent}</p>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="reveal-left bg-[#0f1014] border border-[#1a1b1f] rounded-lg overflow-hidden">
                <div className="p-4 border-b border-[#1a1b1f]">
                  <h3 className="font-semibold text-[#F6F7F9] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#B8FF3D]" />
                    Localização
                  </h3>
                </div>
                <div className="h-64 bg-[#1a1b1f]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.8847926472316!2d-48.73894682553596!3d-26.4071060022024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sRua+Antônio+Amorim,+741,+Porto+Grande,+Araquari+-+SC!2s-26.4071060022024,-48.73894682553596!5e0!3m2!1spt-BR!2sbr!4v1707609600000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização ArteShow"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-[#A6AAB6]">
                    Rua Antônio Amorim, 741 - Porto Grande, Araquari - SC
                  </p>
                  <a
                    href="https://maps.google.com/?q=Rua+Antônio+Amorim,+741,+Araquari,+SC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#B8FF3D] hover:underline mt-2 inline-block"
                  >
                    Ver no Google Maps
                  </a>
                </div>
              </div>

              {/* Team */}
              <div className="reveal-left bg-[#0f1014] border border-[#1a1b1f] rounded-lg p-6">
                <h3 className="font-semibold text-[#F6F7F9] mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#B8FF3D]" />
                  Equipe Comercial
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {team.map((member, index) => (
                    <a
                      key={index}
                      href={`https://wa.me/55${member.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-[#1a1b1f] rounded hover:bg-[#2a2b2f] transition-colors group"
                    >
                      <div className="flex items-center">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-[#F6F7F9]">{member.name}</div>
                          <div className="text-xs text-[#A6AAB6]">{member.role} <span className="block text-sm text-[#A6AAB6]">{member.phone}</span></div>
                        </div>
                      </div>
                      <MessageCircle className="w-4 h-4 text-[#B8FF3D] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="reveal-left flex items-center gap-4">
                <span className="text-sm text-[#A6AAB6]">Siga-nos:</span>
                <a
                  href="https://instagram.com/arteshowestrutura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1a1b1f] rounded-full flex items-center justify-center hover:bg-[#B8FF3D] hover:text-[#0B0C0E] transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/5547997454054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1a1b1f] rounded-full flex items-center justify-center hover:bg-[#B8FF3D] hover:text-[#0B0C0E] transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="reveal-right">
              <div className="bg-[#0f1014] border border-[#1a1b1f] rounded-lg p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-[#F6F7F9] mb-6">
                  Solicite um orçamento
                </h3>

                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#B8FF3D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-[#B8FF3D]" />
                    </div>
                    <h4 className="text-xl font-semibold text-[#F6F7F9] mb-2">
                      Mensagem enviada!
                    </h4>
                    <p className="text-[#A6AAB6]">
                      Entraremos em contato em até 24h.
                    </p>
                  </div>
                ) : (
                  <form 
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#F6F7F9]">Nome *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Seu nome"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-[#1a1b1f] border-[#2a2b2f] text-[#F6F7F9] placeholder:text-[#5a5b5f] focus:border-[#B8FF3D]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-[#F6F7F9]">Empresa</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Sua empresa"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-[#1a1b1f] border-[#2a2b2f] text-[#F6F7F9] placeholder:text-[#5a5b5f] focus:border-[#B8FF3D]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#F6F7F9]">E-mail *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-[#1a1b1f] border-[#2a2b2f] text-[#F6F7F9] placeholder:text-[#5a5b5f] focus:border-[#B8FF3D]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#F6F7F9]">Telefone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="(47) 99999-9999"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="bg-[#1a1b1f] border-[#2a2b2f] text-[#F6F7F9] placeholder:text-[#5a5b5f] focus:border-[#B8FF3D]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectType" className="text-[#F6F7F9]">Tipo de projeto</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      >
                        <SelectTrigger className="bg-[#1a1b1f] border-[#2a2b2f] text-[#F6F7F9]">
                          <SelectValue placeholder="Selecione o tipo de projeto" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1b1f] border-[#2a2b2f]">
                          <SelectItem value="show">Show / Festival</SelectItem>
                          <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                          <SelectItem value="feira">Feira / Stand</SelectItem>
                          <SelectItem value="particular">Evento Particular</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#F6F7F9]">Mensagem</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Descreva seu projeto, datas, local e necessidades..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="bg-[#1a1b1f] border-[#2a2b2f] text-[#F6F7F9] placeholder:text-[#5a5b5f] focus:border-[#B8FF3D] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Enviar solicitação
                    </button>

                    <p className="text-xs text-[#A6AAB6] text-center">
                      Ao enviar, você concorda com nossa política de privacidade.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
