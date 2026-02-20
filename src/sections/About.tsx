import { useEffect, useRef, useState } from 'react';
import { Award, Factory, Users, Zap, Check, ArrowRight, MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const differentials = [
  {
    icon: Factory,
    title: 'Parque Fabril',
    description: '6.800m² de área industrial com tecnologia de ponta para fabricação de estruturas em alumínio.'
  },
  {
    icon: Zap,
    title: 'Corte a Laser',
    description: 'Primeira no Brasil a investir em tecnologia de corte a laser no ramo de estruturas para eventos.'
  },
  {
    icon: Award,
    title: 'Qualidade Premium',
    description: 'Acabamento superior, solda escamada de alta qualidade e controle dimensional rigoroso.'
  },
  {
    icon: Users,
    title: 'Atendimento Nacional',
    description: 'Sede em Araquari-SC com atendimento a produtoras e empresas em todo o Brasil.'
  }
];

const features = [
  '100% alumínio: leveza, resistência e durabilidade',
  'Acabamento premium e estética profissional',
  'Solda escamada de alta qualidade',
  'Fabricação própria com tecnologia de ponta',
  'Projetos personalizados sob demanda',
  'Centros de usinagem própria'
];

const salesTeam = [
  { name: 'Carlos Timóteo', role: 'Comercial', phone: '(47) 9647-2896', photo: '/images/CARLOS.png' },
  { name: 'Aryane Silva', role: 'Comercial', phone: '(47) 9158-5403', photo: '/images/ARYANE.png' },
  { name: 'Felix', role: 'Comercial', phone: '(47) 9237-5210', photo: '/images/FELIX.png' },
  { name: 'Regina', role: 'Comercial', phone: '(47) 9256-8186', photo: '/images/REGINA.png' },
  { name: 'Marli', role: 'Gerente Comercial', phone: '(47) 8482-5773', photo: '/images/MARLI.png' }
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showSalesDialog, setShowSalesDialog] = useState(false);

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

  return (
    <section
      id="empresa"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full section-dark"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            <div>
              <span className="reveal micro-label text-[#B8FF3D] mb-4 block">
                Sobre a ArteShow
              </span>
              <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Tecnologia a serviço do{' '}
                <span className="accent-text">entretenimento</span>
              </h2>
              <p className="reveal text-[#A6AAB6] text-lg leading-relaxed mb-6">
                Desde outubro de 2015, a ArteShow é referência na fabricação de 
                estruturas em alumínio para eventos, atendendo produções de todos 
                os portes com alto padrão de acabamento e soluções personalizadas.
              </p>
              <p className="reveal text-[#A6AAB6] leading-relaxed">
                Com sede em Araquari – SC, atuamos em todo o Brasil oferecendo 
                tecnologia, qualidade industrial e estética premium para eventos 
                corporativos, festivais, shows e feiras.
              </p>
            </div>

            {/* Stats */}
            <div className="reveal-right grid grid-cols-2 gap-6">
              <div className="bg-[#0f1014] border border-[#1a1b1f] p-6 rounded-lg">
                <div className="text-4xl lg:text-5xl font-bold accent-text mb-2">+10</div>
                <div className="text-sm text-[#A6AAB6]">Anos de experiência no mercado</div>
              </div>
              <div className="bg-[#0f1014] border border-[#1a1b1f] p-6 rounded-lg">
                <div className="text-4xl lg:text-5xl font-bold accent-text mb-2">6.800</div>
                <div className="text-sm text-[#A6AAB6]">m² de parque fabril</div>
              </div>
              <div className="bg-[#0f1014] border border-[#1a1b1f] p-6 rounded-lg">
                <div className="text-4xl lg:text-5xl font-bold accent-text mb-2">+1000</div>
                <div className="text-sm text-[#A6AAB6]">Projetos entregues</div>
              </div>
              <div className="bg-[#0f1014] border border-[#1a1b1f] p-6 rounded-lg">
                <div className="text-4xl lg:text-5xl font-bold accent-text mb-2">Brasil</div>
                <div className="text-sm text-[#A6AAB6]">Atendimento nacional</div>
              </div>
            </div>
          </div>

          {/* Differentials */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {differentials.map((item, index) => (
              <div
                key={index}
                className="reveal-scale group bg-[#0f1014] border border-[#1a1b1f] p-6 rounded-lg hover:border-[#B8FF3D]/30 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-[#B8FF3D]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#B8FF3D]/20 transition-colors">
                  <item.icon className="w-6 h-6 text-[#B8FF3D]" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#F6F7F9]">{item.title}</h3>
                <p className="text-sm text-[#A6AAB6]">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Features List */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-left">
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                Por que escolher a <span className="accent-text">ArteShow</span>?
              </h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-6 h-6 bg-[#B8FF3D]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#B8FF3D]" />
                    </div>
                    <span className="text-[#A6AAB6]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowSalesDialog(true)}
                className="btn-primary inline-flex items-center gap-2 mt-8"
              >
                Falar com Especialista
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="reveal-right relative flex justify-center">
              <div className="relative rounded-lg overflow-hidden max-w-md w-full">
                <img
                  src="/images/Fachada.jpeg"
                  alt="Fachada da ArteShow"
                  className="w-full h-80 lg:h-96 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/80 via-transparent to-transparent" />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-[#0B0C0E] border border-[#1a1b1f] p-4 rounded-lg max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#B8FF3D] rounded-full flex items-center justify-center">
                    <Factory className="w-5 h-5 text-[#0B0C0E]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#F6F7F9]">Nova Fábrica</div>
                    <div className="text-xs text-[#A6AAB6]">Rua Antônio Amorim, 741</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Team Dialog */}
      <Dialog open={showSalesDialog} onOpenChange={setShowSalesDialog}>
        <DialogContent className="max-w-md bg-[#0B0C0E] border-[#1a1b1f] text-[#F6F7F9]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-[#B8FF3D]" />
              Equipe Comercial
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-[#A6AAB6] mb-4">
            Escolha um de nossos consultores para falar pelo WhatsApp:
          </p>
          <div className="space-y-3">
            {salesTeam.map((member, index) => (
              <a
                key={index}
                href={`https://wa.me/55${member.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#1a1b1f] rounded-lg hover:bg-[#2a2b2f] transition-colors group"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[#F6F7F9]">{member.name}</div>
                  <div className="text-sm text-[#A6AAB6]">{member.role}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-[#A6AAB6] hidden sm:inline">{member.phone}</span>
                  <MessageCircle className="w-5 h-5 text-[#B8FF3D] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
