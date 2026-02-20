import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Maximize2, MessageCircle, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
  category: string;
}

const products: Product[] = [
  {
    id: 'trelicas',
    name: 'Treliças',
    description: 'Estruturas em alumínio para sustentação de iluminação, som e cenografia. Disponíveis em diversos perfis e comprimentos.',
    image: '/images/Diversas/EstruturaSemanudio.jpg',
    features: [
      'Alumínio 6061-T6 de alta resistência',
      'Conexões por espigão com pino e clip',
      'Acabamento anodizado ou polido',
      'Compatibilidade com principais sistemas do mercado'
    ],
    specs: [
      { label: 'Perfis', value: 'L20, L25, L30, P15, P25, P30, P38, P50, P63' },
      { label: 'Comprimentos', value: '0,5m a 6,0m (sob consulta)' },
      { label: 'Carga', value: 'Consulte projeto específico' },
      { label: 'Acabamento', value: 'Anodizado ou Polido' }
    ],
    category: 'Estruturas'
  },
  {
    id: 'palcos',
    name: 'Palco Stage',
    description: 'Sistema modular de palcos com plataformas ajustáveis, ideal para shows, eventos corporativos e festivais.',
    image: '/images/Palco Camarote/Palco_camarote.gif',
    features: [
      'Plataforma modular com pés ajustáveis',
      'Compensado naval antiderrapante',
      'Montagem rápida sem ferramentas',
      'Capacidade de carga superior'
    ],
    specs: [
      { label: 'Altura', value: 'Regulável até 2,2m' },
      { label: 'Carga', value: '700kg/m² (estática)' },
      { label: 'Piso', value: 'Compensado 25mm' },
      { label: 'Material', value: 'Alumínio e compensado naval' }
    ],
    category: 'Palcos'
  },
  {
    id: 'octashow',
    name: 'Octashow',
    description: 'Sistema modular premium com perfis octagonais para camarins, stands e estruturas exclusivas.',
    image: '/images/Octashow/Octashow2.JPG',
    features: [
      'Perfis octagonais em alumínio',
      'Chapas TS com encaixe rápido',
      'Estética premium e exclusiva',
      'Ideal para camarins e stands'
    ],
    specs: [
      { label: 'Perfil', value: 'Octagonal em alumínio' },
      { label: 'Chapa', value: 'TS (trapezoidal)' },
      { label: 'Montagem', value: 'Encaixe rápido' },
      { label: 'Uso', value: 'Camarins, stands, backstage' }
    ],
    category: 'Sistemas Especiais'
  },
  {
    id: 'barricadas',
    name: 'Barricadas',
    description: 'Sistemas de contenção e organização de público para shows, festivais e eventos.',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Alta resistência estrutural',
      'Leveza e durabilidade do alumínio',
      'Acabamento premium',
      'Fácil transporte e montagem'
    ],
    specs: [
      { label: 'Material', value: 'Alumínio 6061-T6' },
      { label: 'Altura', value: '1,0m a 1,5m (padrão)' },
      { label: 'Comprimento', value: '1,0m a 2,0m' },
      { label: 'Aplicação', value: 'Áreas VIP, backstage, corredores' }
    ],
    category: 'Segurança'
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    description: 'Completa linha de acessórios para montagem: bases, torres, pontes, escadas e conectores.',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Bases e torres estabilizadoras',
      'Pontes e escadas de acesso',
      'Conectores e engates diversos',
      'Projetos especiais sob consulta'
    ],
    specs: [
      { label: 'Bases', value: 'Diversos modelos' },
      { label: 'Torres', value: 'Até 12m de altura' },
      { label: 'Conectores', value: 'Compatíveis com todas as linhas' },
      { label: 'Personalização', value: 'Sob consulta' }
    ],
    category: 'Acessórios'
  },
  {
    id: 'backdrop',
    name: 'Backdrop & Pórticos',
    description: 'Estruturas para painéis de LED, comunicação visual, telões e entrada de eventos.',
    image: '/images/Diversas/TraveCirculo.jpg',
    features: [
      'Estruturas para painéis de LED',
      'Pórticos de entrada personalizados',
      'Suportes para telões e projeção',
      'Montagem rápida e segura'
    ],
    specs: [
      { label: 'Largura', value: 'Sob medida' },
      { label: 'Altura', value: 'Até 10m' },
      { label: 'Carga', value: 'Consulte projeto' },
      { label: 'Acabamento', value: 'Anodizado ou pintado' }
    ],
    category: 'Estruturas'
  }
];

const salesTeam = [
  { name: 'Carlos Timóteo', role: 'Comercial', phone: '(47) 9647-2896', photo: '/images/CARLOS.png' },
  { name: 'Aryane Silva', role: 'Comercial', phone: '(47) 9158-5403', photo: '/images/ARYANE.png' },
  { name: 'Felix', role: 'Comercial', phone: '(47) 9237-5210', photo: '/images/FELIX.png' },
  { name: 'Regina', role: 'Comercial', phone: '(47) 9256-8186', photo: '/images/REGINA.png' },
  { name: 'Marli', role: 'Gerente Comercial', phone: '(47) 8482-5773', photo: '/images/MARLI.png' }
];

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSalesDialog, setShowSalesDialog] = useState(false);

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

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


  // Corrige navegação ao trocar de categoria
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProducts.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  };

  return (
    <section
      id="produtos"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full section-dark"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="reveal micro-label text-[#B8FF3D] mb-4 block">
              Nossos Produtos
            </span>
            <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Soluções em <span className="accent-text">alumínio</span>
            </h2>
            <p className="reveal text-[#A6AAB6] text-lg max-w-2xl mx-auto">
              Fabricamos uma linha completa de estruturas para eventos, 
              desde treliças técnicas até sistemas modulares exclusivos.
            </p>
          </div>

          {/* Category Filter */}
          <div className="reveal flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#B8FF3D] text-[#0B0C0E]'
                    : 'bg-[#1a1b1f] text-[#A6AAB6] hover:text-[#F6F7F9]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid - Desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="reveal-scale group relative bg-[#0f1014] rounded-lg overflow-hidden border border-[#1a1b1f] hover:border-[#B8FF3D]/30 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent" />
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="absolute top-4 right-4 p-2 bg-[#0B0C0E]/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="w-4 h-4 text-[#F6F7F9]" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs text-[#B8FF3D] font-mono uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 text-[#F6F7F9]">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#A6AAB6] mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex items-center gap-2 text-sm text-[#B8FF3D] hover:gap-3 transition-all"
                  >
                    Ver detalhes
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Products Carousel - Mobile */}
          <div className="lg:hidden">
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                {filteredProducts.length > 0 && (
                  <div className="bg-[#0f1014] border border-[#1a1b1f] rounded-lg overflow-hidden">
                    <div className="relative h-64">
                      <img
                        src={filteredProducts[currentIndex].image}
                        alt={filteredProducts[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-[#B8FF3D] font-mono uppercase tracking-wider">
                        {filteredProducts[currentIndex].category}
                      </span>
                      <h3 className="text-xl font-semibold mt-2 mb-3 text-[#F6F7F9]">
                        {filteredProducts[currentIndex].name}
                      </h3>
                      <p className="text-sm text-[#A6AAB6] mb-4">
                        {filteredProducts[currentIndex].description}
                      </p>
                      <button
                        onClick={() => setSelectedProduct(filteredProducts[currentIndex])}
                        className="flex items-center gap-2 text-sm text-[#B8FF3D]"
                      >
                        Ver detalhes
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={prevProduct}
                  className="p-2 bg-[#1a1b1f] rounded-full hover:bg-[#2a2b2f] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  {filteredProducts.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentIndex ? 'bg-[#B8FF3D]' : 'bg-[#2a2b2f]'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextProduct}
                  className="p-2 bg-[#1a1b1f] rounded-full hover:bg-[#2a2b2f] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="reveal text-center mt-16">
            <p className="text-[#A6AAB6] mb-6">
              Precisa de um projeto especial? Traga sua ideia!
            </p>
            <button
              onClick={() => setShowSalesDialog(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              Falar com Especialista
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl bg-[#0B0C0E] border-[#1a1b1f] text-[#F6F7F9] max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-xs text-[#B8FF3D] font-mono uppercase tracking-wider">
                      {selectedProduct.category}
                    </span>
                    <p className="text-[#A6AAB6] mt-3">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-[#F6F7F9]">Características</h4>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#A6AAB6]">
                          <Check className="w-4 h-4 text-[#B8FF3D] mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-[#F6F7F9]">Especificações</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProduct.specs.map((spec, idx) => (
                        <div key={idx} className="bg-[#1a1b1f] p-3 rounded">
                          <div className="text-xs text-[#A6AAB6]">{spec.label}</div>
                          <div className="text-sm font-medium text-[#F6F7F9]">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      setShowSalesDialog(true);
                    }}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Solicitar Orçamento
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
