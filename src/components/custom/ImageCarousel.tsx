import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

const carouselImages: CarouselImage[] = [
  {
    src: '/images/Fachada.png',
    alt: 'Fachada da ArteShow',
    caption: 'Nossa nova fábrica - Rua Antônio Amorim, 741'
  },
  {
    src: '/images/TrelixFabrica.jpeg',
    alt: 'Trelix na fábrica',
    caption: 'Trelix - Nosso mascote em tamanho real'
  },
  {
    src: '/images/equipe-evento.png',
    alt: 'Equipe ArteShow',
    caption: 'Equipe ArteShow na Semanáudio Curitiba 2025'
  },
  {
    src: '/images/ParqueFabril.png',
    alt: 'Parque Fabril da ArteShow viso de cima',
    caption: 'Parque fabril da ArteShow - 6.800m² de inovação e tecnologia para atender nossos clientes com excelência'
  },
  {
    src: '/images/ARTEShow-Brasil.png',
    alt: 'ARTE SHOW Presente no Brasil',
    caption: 'Estamos em todos os cantos do Brasil, levando inovação e qualidade para nossos clientes'
  },
  {
    src: '/images/TRELIX2.jpeg',
    alt: 'Trelix conhecendo o Brasil',
    caption: 'Nosso mascote Trelix em sua jornada pelo Brasil, visitando clientes e parceiros por todo o país através de nossas mídias sociais'
  },
  {
    src: '/images/Diversas/Coração.jpg',
    alt: 'Coração da ArteShow',
    caption: 'Nosso coração bate ao compasso da música e dos espetáculos'
  }
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div 
      className="relative w-full bg-[#0B0C0E] max-h-[35vh] sm:max-h-[45vh] lg:max-h-[50vh]"
      style={{ aspectRatio: '16/9' }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Images */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center bg-[#1a1b1f] ${
            index === currentIndex 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-contain max-h-full"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/30 to-transparent pointer-events-none" />
          
          {/* Caption */}
          {image.caption && (
            <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-12 lg:right-auto">
              <div className="bg-[#0B0C0E]/80 backdrop-blur-sm border border-[#1a1b1f] px-3 py-2 lg:px-4 lg:py-3 rounded-lg w-auto">
                <p className="text-xs lg:text-sm text-[#F6F7F9]">{image.caption}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-9 h-9 lg:w-10 lg:h-10 bg-[#0B0C0E]/60 backdrop-blur-sm border border-[#1a1b1f] rounded-full flex items-center justify-center text-[#F6F7F9] hover:bg-[#B8FF3D] hover:text-[#0B0C0E] hover:border-[#B8FF3D] transition-all z-10"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-9 h-9 lg:w-10 lg:h-10 bg-[#0B0C0E]/60 backdrop-blur-sm border border-[#1a1b1f] rounded-full flex items-center justify-center text-[#F6F7F9] hover:bg-[#B8FF3D] hover:text-[#0B0C0E] hover:border-[#B8FF3D] transition-all z-10"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 lg:gap-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-[#B8FF3D] w-5 h-2 lg:w-6 lg:h-2' 
                : 'bg-[#F6F7F9]/40 hover:bg-[#F6F7F9]/60 w-2 h-2'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1a1b1f]">
        <div 
          className="h-full bg-[#B8FF3D] transition-all duration-300"
          style={{ 
            width: `${((currentIndex + 1) / carouselImages.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
}
