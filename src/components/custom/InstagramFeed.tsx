import { useEffect, useRef, useState } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

// Posts simulados do Instagram (em produção, isso viria da API)
const instagramPosts = [
  {
    id: '1',
    image: '/images/TrelixFabrica.jpeg',
    caption: 'Trelix em tamanho real na nossa fábrica! 🤖✨',
    likes: 234,
    comments: 18,
    link: 'https://instagram.com/arteshowestrutura'
  },
  {
    id: '2',
    image: '/images/equipe-evento.jpeg',
    caption: 'Equipe ArteShow na Semanáudio Curitiba 2025! 🎉',
    likes: 189,
    comments: 12,
    link: 'https://instagram.com/arteshowestrutura'
  },
  {
    id: '3',
    image: '/images/Fachada.jpeg',
    caption: 'Nova fábrica inaugurada! 6.800m² de estruturas 🏭',
    likes: 312,
    comments: 24,
    link: 'https://instagram.com/arteshowestrutura'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop',
    caption: 'Palco Stage pronto para mais um show! 🎭',
    likes: 156,
    comments: 8,
    link: 'https://instagram.com/arteshowestrutura'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
    caption: 'Treliças de alta qualidade para seus eventos 🏗️',
    likes: 278,
    comments: 15,
    link: 'https://instagram.com/arteshowestrutura'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop',
    caption: 'Sistema Octashow - exclusividade ArteShow ⭐',
    likes: 198,
    comments: 11,
    link: 'https://instagram.com/arteshowestrutura'
  }
];

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 w-full section-dark overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#B8FF3D]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B8FF3D]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="w-full px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#f77737]/20 border border-[#833ab4]/30 px-4 py-2 rounded-full mb-6">
              <Instagram className="w-5 h-5 text-[#E1306C]" />
              <span className="text-sm text-[#F6F7F9]">@arteshowestrutura</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Siga-nos no <span className="text-[#E1306C]">Instagram</span>
            </h2>
            <p className="text-[#A6AAB6] text-lg max-w-2xl mx-auto">
              Acompanhe nossos projetos, eventos e novidades em tempo real.
            </p>
          </div>

          {/* Instagram Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post, index) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative aspect-square overflow-hidden rounded-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0B0C0E]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-[#E1306C]" />
                      <span className="text-sm text-[#F6F7F9]">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 text-[#F6F7F9]" />
                      <span className="text-sm text-[#F6F7F9]">{post.comments}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#A6AAB6] text-center line-clamp-2">
                    {post.caption}
                  </p>
                </div>

                {/* Instagram icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Instagram className="w-5 h-5 text-[#F6F7F9]" />
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className={`text-center mt-10 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a
              href="https://instagram.com/arteshowestrutura"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#f77737] text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-[#E1306C]/30 transition-all"
            >
              <Instagram className="w-5 h-5" />
              Ver perfil no Instagram
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
