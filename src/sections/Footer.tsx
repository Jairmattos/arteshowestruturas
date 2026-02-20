import { Instagram, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  produtos: [
    { name: 'Treliças', href: '#produtos' },
    { name: 'Palco Stage', href: '#produtos' },
    { name: 'Octashow', href: '#produtos' },
    { name: 'Barricadas', href: '#produtos' },
    { name: 'Acessórios', href: '#produtos' }
  ],
  empresa: [
    { name: 'Sobre nós', href: '#empresa' },
    { name: 'Fábrica', href: '#empresa' },
    { name: 'Qualidade', href: '#empresa' },
    { name: 'Contato', href: '#contato' }
  ],
  legal: [
    { name: 'Política de Privacidade', href: '#' },
    { name: 'Termos de Uso', href: '#' }
  ]
};

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#070809] border-t border-[#1a1b1f]">
      <div className="w-full px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <img
                src="/images/Logomarca.jpeg"
                alt="ArteShow"
                className="h-10 w-auto object-contain mb-6"
              />
              <p className="text-[#A6AAB6] text-sm leading-relaxed mb-6">
                Estruturas em alumínio para shows, eventos e festas. 
                Qualidade industrial e atendimento nacional.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/arteshowestrutura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1a1b1f] rounded-full flex items-center justify-center text-[#A6AAB6] hover:bg-[#B8FF3D] hover:text-[#0B0C0E] transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/5547997454054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1a1b1f] rounded-full flex items-center justify-center text-[#A6AAB6] hover:bg-[#B8FF3D] hover:text-[#0B0C0E] transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="mailto:administrativo@arteshowestruturas.com.br"
                  className="w-10 h-10 bg-[#1a1b1f] rounded-full flex items-center justify-center text-[#A6AAB6] hover:bg-[#B8FF3D] hover:text-[#0B0C0E] transition-all"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold text-[#F6F7F9] mb-4">Produtos</h4>
              <ul className="space-y-3">
                {footerLinks.produtos.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-sm text-[#A6AAB6] hover:text-[#B8FF3D] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-[#F6F7F9] mb-4">Empresa</h4>
              <ul className="space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-sm text-[#A6AAB6] hover:text-[#B8FF3D] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-[#F6F7F9] mb-4">Contato</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B8FF3D] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#A6AAB6]">
                    Rua Antônio Amorim, 741<br />
                    Porto Grande, Araquari - SC<br />
                    CEP 89245-000
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#B8FF3D] flex-shrink-0" />
                  <a
                    href="tel:+554734383468"
                    className="text-sm text-[#A6AAB6] hover:text-[#B8FF3D] transition-colors"
                  >
                    (47) 3438-3468
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-[#B8FF3D] flex-shrink-0" />
                  <a
                    href="https://wa.me/5547997454054"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#A6AAB6] hover:text-[#B8FF3D] transition-colors"
                  >
                    (47) 99745-4054
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#B8FF3D] flex-shrink-0" />
                  <a
                    href="mailto:administrativo@arteshowestruturas.com.br"
                    className="text-sm text-[#A6AAB6] hover:text-[#B8FF3D] transition-colors"
                  >
                    administrativo@arteshowestruturas.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-[#1a1b1f] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#5a5b5f]">
              © {new Date().getFullYear()} ArteShow Estruturas. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-[#5a5b5f] hover:text-[#A6AAB6] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
