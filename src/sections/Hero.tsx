import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import ImageCarousel from '../components/custom/ImageCarousel';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Animate elements on load
    const elements = content.querySelectorAll('.animate-item');
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      setTimeout(() => {
        element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100 + index * 100);
    });
  }, []);

  const scrollToProducts = () => {
    const element = document.querySelector('#produtos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full section-dark"
    >
      {/* Image Carousel at the top */}
      <ImageCarousel />

      {/* Content Section */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-6 lg:px-12 py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="animate-item">
                <span className="micro-label text-[#B8FF3D]">
                  Estruturas em Alumínio
                </span>
              </div>

              <h1 className="text-4xl font-bold">
  Fabricante de Treliças, Palcos e Box Truss em Alumínio para Shows e Eventos
</h1>

              <p className="animate-item text-lg lg:text-xl text-[#A6AAB6] max-w-xl leading-relaxed">
                Fabricamos treliças, palcos modulares e acessórios em alumínio 
                com acabamento industrial e segurança certificada para shows, 
                eventos e festas em todo o Brasil.
              </p>

              <div className="animate-item flex flex-wrap gap-4">
                <button
                  onClick={scrollToProducts}
                  className="btn-primary flex items-center gap-2 group"
                >
                  Conhecer Produtos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="https://wa.me/5547997454054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Solicitar Orçamento
                </a>
              </div>

              {/* Stats */}
              <div className="animate-item grid grid-cols-3 gap-6 pt-8 border-t border-[#1a1b1f]">
                <div>
                  <div className="text-2xl lg:text-3xl font-bold accent-text">+10</div>
                  <div className="text-sm text-[#A6AAB6]">Anos de experiência</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold accent-text">6.800m²</div>
                  <div className="text-sm text-[#A6AAB6]">Parque fabril</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold accent-text">+1000</div>
                  <div className="text-sm text-[#A6AAB6]">Projetos entregues</div>
                </div>
              </div>
            </div>

            {/* Right Column - Info Cards */}
            <div className="hidden lg:block space-y-6">
              <div className="animate-item card-dark p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-[#F6F7F9]">
                  Montagem Técnica com agilidade
                </h3>
                <p className="text-[#A6AAB6] text-sm leading-relaxed">
                  Engates precisos, perfis de alta carga e manual completo de 
                  instalação. Nossas estruturas são projetadas para montagem 
                  rápida e segura.
                </p>
              </div>

              <div className="animate-item card-dark p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-[#F6F7F9]">
                  Qualidade Certificada
                </h3>
                <p className="text-[#A6AAB6] text-sm leading-relaxed">
                  Material em alumínio 6061-T6, acabamento anodizado ou polido, 
                  conforme normas técnicas do setor de eventos.
                </p>
              </div>

              <div className="animate-item card-dark p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-[#F6F7F9]">
                  Atendimento Nacional
                </h3>
                <p className="text-[#A6AAB6] text-sm leading-relaxed">
                  Sediados em Araquari-SC, atendemos produtoras, DJ's, prefeituras, 
                  igrejas e empresas de sonorização e locadoras de estruturas para eventos em todo o território brasileiro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToProducts}
          className="text-[#A6AAB6] hover:text-[#B8FF3D] transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
