import { useState, useEffect, useRef } from 'react';
import { X, Send, ChevronRight, HelpCircle, Package, MapPin, Phone, MessageCircle, Users } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  options?: { label: string; action: string }[];
  salesTeam?: boolean;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specs?: Record<string, string>;
  weight?: string;
  volume?: string;
  keywords?: string[];
  technicalData?: {
    comprimento?: string;
    pesoUnitario?: string; // em kg
    cubagem?: string; // em m³
    diametro?: string;
    altura?: string;
  }[];
}

interface FAQ {
  id: string;
  category: string;
  question_keywords: string[];
  answer: string;
}

const quickReplies = [
  { icon: Package, label: 'Ver produtos', action: 'products' },
  { icon: Phone, label: 'Falar com vendas', action: 'show_sales_team' },
  { icon: MapPin, label: 'Nosso endereço', action: 'address' },
  { icon: HelpCircle, label: 'Dúvidas', action: 'help' }
];

const salesTeam = [
  { name: 'Carlos Timóteo', role: 'Comercial', phone: '(47) 9647-2896', photo: '/images/CARLOS.png' },
  { name: 'Aryane Silva', role: 'Comercial', phone: '(47) 9158-5403', photo: '/images/ARYANE.png' },
  { name: 'Felix', role: 'Comercial', phone: '(47) 9237-5210', photo: '/images/FELIX.png' },
  { name: 'Regina', role: 'Comercial', phone: '(47) 9256-8186', photo: '/images/REGINA.png' },
  { name: 'Marli', role: 'Gerente Comercial', phone: '(47) 8482-5773', photo: '/images/MARLI.png' }
];

// Banco de produtos ArteShow - Dados reais da planilha
const products: Product[] = [
  // Série L20
  {
    id: 'trelica_l20',
    name: 'Treliça L20',
    category: 'Treliças Série L',
    description: 'Treliça em alumínio 6061-T6, perfil L20 com conexões por espigão. Série leve, ideal para estruturas menores.',
    specs: { 'Perfil': 'L20', 'Material': 'Alumínio 6061-T6', 'Série': 'Leve' },
    keywords: ['treliça', 'l20', 'estrutura', 'alumínio', 'torre', 'série leve', 'leve'],
    technicalData: [
      { comprimento: '0,5m', pesoUnitario: '2.5', cubagem: '0.02' },
      { comprimento: '1,0m', pesoUnitario: '8.0', cubagem: '0.04' },
      { comprimento: '1,5m', pesoUnitario: '14.0', cubagem: '0.06' },
      { comprimento: '2,0m', pesoUnitario: '14.0', cubagem: '0.08' },
      { comprimento: '3,0m', pesoUnitario: '15.0', cubagem: '0.12' },
      { comprimento: '3,6m', pesoUnitario: '11.0', cubagem: '0.14' },
      { comprimento: '4,0m', pesoUnitario: '12.0', cubagem: '0.16' }
    ]
  },
  // Série L25
  {
    id: 'trelica_l25',
    name: 'Treliça L25',
    category: 'Treliças Série L',
    description: 'Perfil L25 em alumínio, intermediária entre L20 e L30, ótima relação peso/resistência.',
    specs: { 'Perfil': 'L25', 'Material': 'Alumínio 6061-T6', 'Série': 'Leve-Média' },
    keywords: ['treliça', 'l25', 'estrutura', 'alumínio', 'torre'],
    technicalData: [
      { comprimento: '0,5m', pesoUnitario: '4.0', cubagem: '0.03' },
      { comprimento: '0,75m', pesoUnitario: '5.0', cubagem: '0.05' },
      { comprimento: '1,0m', pesoUnitario: '5.7', cubagem: '0.06' },
      { comprimento: '1,5m', pesoUnitario: '8.95', cubagem: '0.09' },
      { comprimento: '2,0m', pesoUnitario: '9.7', cubagem: '0.13' },
      { comprimento: '2,5m', pesoUnitario: '10.45', cubagem: '0.16' },
      { comprimento: '3,0m', pesoUnitario: '16.3', cubagem: '0.19' },
      { comprimento: '4,0m', pesoUnitario: '18.0', cubagem: '0.25' }
    ]
  },
  // Série L30
  {
    id: 'trelica_l30',
    name: 'Treliça L30',
    category: 'Treliças Série L',
    description: 'Perfil L30, série leve premium com maior resistência que L25.',
    specs: { 'Perfil': 'L30', 'Material': 'Alumínio 6061-T6', 'Série': 'Leve Premium' },
    keywords: ['treliça', 'l30', 'estrutura', 'alumínio', 'torre'],
    technicalData: [
      { comprimento: '0,5m', pesoUnitario: '7.15', cubagem: '0.05' },
      { comprimento: '1,0m', pesoUnitario: '8.8', cubagem: '0.09' },
      { comprimento: '1,5m', pesoUnitario: '10.5', cubagem: '0.14' },
      { comprimento: '2,0m', pesoUnitario: '15.9', cubagem: '0.18' },
      { comprimento: '2,5m', pesoUnitario: '18.0', cubagem: '0.23' },
      { comprimento: '3,0m', pesoUnitario: '21.0', cubagem: '0.27' },
      { comprimento: '4,0m', pesoUnitario: '27.16', cubagem: '0.36' }
    ]
  },
  // Série P15 (Média)
  {
    id: 'trelica_p15',
    name: 'Treliça P15',
    category: 'Treliças Série P',
    description: 'Box truss P15, série média, ideal para aplicações leves de iluminação e som.',
    specs: { 'Perfil': 'P15', 'Material': 'Alumínio 6061-T6', 'Série': 'Média' },
    keywords: ['treliça', 'p15', 'box truss', 'estrutura', 'alumínio', 'torre'],
    technicalData: [
      { comprimento: '0,25m', pesoUnitario: '1.5', cubagem: '0.01' },
      { comprimento: '0,5m', pesoUnitario: '1.95', cubagem: '0.01' },
      { comprimento: '0,95m', pesoUnitario: '3.0', cubagem: '0.02' },
      { comprimento: '1,0m', pesoUnitario: '3.1', cubagem: '0.02' },
      { comprimento: '1,5m', pesoUnitario: '4.6', cubagem: '0.03' },
      { comprimento: '2,0m', pesoUnitario: '6.1', cubagem: '0.05' },
      { comprimento: '2,5m', pesoUnitario: '6.8', cubagem: '0.06' },
      { comprimento: '3,0m', pesoUnitario: '7.5', cubagem: '0.07' },
      { comprimento: '3,5m', pesoUnitario: '15.0', cubagem: '0.08' },
      { comprimento: '4,0m', pesoUnitario: '9.0', cubagem: '0.09' }
    ]
  },
  // Série P25 (Média-Alta)
  {
    id: 'trelica_p25',
    name: 'Treliça P25',
    category: 'Treliças Série P',
    description: 'Box truss P25, série média-alta, muito versátil para eventos diversos.',
    specs: { 'Perfil': 'P25', 'Material': 'Alumínio 6061-T6', 'Série': 'Média-Alta' },
    keywords: ['treliça', 'p25', 'box truss', 'estrutura', 'alumínio', 'torre', 'carga'],
    technicalData: [
      { comprimento: '0,5m', pesoUnitario: '5.0', cubagem: '0.03' },
      { comprimento: '0,7m', pesoUnitario: '6.0', cubagem: '0.04' },
      { comprimento: '0,75m', pesoUnitario: '6.2', cubagem: '0.05' },
      { comprimento: '1,0m', pesoUnitario: '7.35', cubagem: '0.06' },
      { comprimento: '1,5m', pesoUnitario: '9.15', cubagem: '0.09' },
      { comprimento: '1,75m', pesoUnitario: '14.0', cubagem: '0.11' },
      { comprimento: '2,0m', pesoUnitario: '12.1', cubagem: '0.13' },
      { comprimento: '2,5m', pesoUnitario: '13.05', cubagem: '0.16' },
      { comprimento: '2,93m', pesoUnitario: '16.8', cubagem: '0.18' },
      { comprimento: '3,0m', pesoUnitario: '17.58', cubagem: '0.19' },
      { comprimento: '3,5m', pesoUnitario: '19.5', cubagem: '0.22' },
      { comprimento: '4,0m', pesoUnitario: '21.9', cubagem: '0.25' },
      { comprimento: '4,5m', pesoUnitario: '26.5', cubagem: '0.28' },
      { comprimento: '5,0m', pesoUnitario: '26.6', cubagem: '0.31' }
    ]
  },
  // Série P30 (Alta)
  {
    id: 'trelica_p30',
    name: 'Treliça P30',
    category: 'Treliças Série P',
    description: 'Treliça box truss P30, alta resistência, a mais versátil para iluminação, som e cenografia.',
    specs: { 'Perfil': 'P30', 'Material': 'Alumínio 6061-T6', 'Série': 'Alta', 'Aplicação': 'Iluminação, Som, Cenografia' },
    keywords: ['treliça', 'p30', 'box truss', 'estrutura', 'torre', 'carga', 'alumínio'],
    technicalData: [
      { comprimento: '0,3m', pesoUnitario: '5.0', cubagem: '0.03' },
      { comprimento: '0,4m', pesoUnitario: '6.0', cubagem: '0.04' },
      { comprimento: '0,5m', pesoUnitario: '10.5', cubagem: '0.05' },
      { comprimento: '0,6m', pesoUnitario: '9.0', cubagem: '0.05' },
      { comprimento: '0,7m', pesoUnitario: '10.0', cubagem: '0.06' },
      { comprimento: '0,8m', pesoUnitario: '11.0', cubagem: '0.07' },
      { comprimento: '0,9m', pesoUnitario: '10.0', cubagem: '0.08' },
      { comprimento: '1,0m', pesoUnitario: '11.7', cubagem: '0.09' },
      { comprimento: '1,25m', pesoUnitario: '12.0', cubagem: '0.11' },
      { comprimento: '1,4m', pesoUnitario: '12.0', cubagem: '0.13' },
      { comprimento: '1,5m', pesoUnitario: '15.1', cubagem: '0.14' },
      { comprimento: '1,7m', pesoUnitario: '17.56', cubagem: '0.15' },
      { comprimento: '1,9m', pesoUnitario: '17.56', cubagem: '0.17' },
      { comprimento: '2,0m', pesoUnitario: '18.9', cubagem: '0.18' },
      { comprimento: '2,2m', pesoUnitario: '23.0', cubagem: '0.20' },
      { comprimento: '2,3m', pesoUnitario: '24.0', cubagem: '0.21' },
      { comprimento: '2,5m', pesoUnitario: '22.9', cubagem: '0.23' },
      { comprimento: '2,9m', pesoUnitario: '24.0', cubagem: '0.26' },
      { comprimento: '3,0m', pesoUnitario: '26.04', cubagem: '0.27' },
      { comprimento: '3,3m', pesoUnitario: '26.0', cubagem: '0.30' },
      { comprimento: '3,4m', pesoUnitario: '26.0', cubagem: '0.31' },
      { comprimento: '3,5m', pesoUnitario: '29.7', cubagem: '0.32' },
      { comprimento: '3,8m', pesoUnitario: '32.0', cubagem: '0.34' },
      { comprimento: '4,0m', pesoUnitario: '33.95', cubagem: '0.36' },
      { comprimento: '4,2m', pesoUnitario: '34.5', cubagem: '0.38' },
      { comprimento: '4,5m', pesoUnitario: '36.95', cubagem: '0.41' },
      { comprimento: '5,0m', pesoUnitario: '39.4', cubagem: '0.45' },
      { comprimento: '5,5m', pesoUnitario: '43.4', cubagem: '0.50' },
      { comprimento: '6,0m', pesoUnitario: '48.5', cubagem: '0.54' }
    ]
  },
  // Série P38
  {
    id: 'trelica_p38',
    name: 'Treliça P38',
    category: 'Treliças Série P',
    description: 'Box truss P38, série pesada, para estruturas com grande capacidade de carga.',
    specs: { 'Perfil': 'P38', 'Material': 'Alumínio 6061-T6', 'Série': 'Pesada' },
    keywords: ['treliça', 'p38', 'box truss', 'estrutura', 'torre', 'pesada', 'carga'],
    technicalData: [
      { comprimento: '1,0m', pesoUnitario: '14.9', cubagem: '0.25' },
      { comprimento: '2,0m', pesoUnitario: '25.1', cubagem: '0.50' },
      { comprimento: '3,0m', pesoUnitario: '35.5', cubagem: '0.75' },
      { comprimento: '4,0m', pesoUnitario: '43.7', cubagem: '1.00' }
    ]
  },
  // Série P50 (Máxima resistência)
  {
    id: 'trelica_p50',
    name: 'Treliça P50',
    category: 'Treliças Série P',
    description: 'Box truss P50, máxima resistência para cargas pesadas e estruturas de grande porte.',
    specs: { 'Perfil': 'P50', 'Material': 'Alumínio 6061-T6', 'Série': 'Máxima' },
    keywords: ['treliça', 'p50', 'box truss', 'carga pesada', 'torre', 'máxima', 'maior'],
    technicalData: [
      { comprimento: '0,3m', pesoUnitario: '13.0', cubagem: '0.08' },
      { comprimento: '0,5m', pesoUnitario: '14.3', cubagem: '0.13' },
      { comprimento: '1,0m', pesoUnitario: '16.0', cubagem: '0.25' },
      { comprimento: '1,5m', pesoUnitario: '22.0', cubagem: '0.38' },
      { comprimento: '2,0m', pesoUnitario: '24.0', cubagem: '0.50' },
      { comprimento: '2,5m', pesoUnitario: '28.0', cubagem: '0.63' },
      { comprimento: '3,0m', pesoUnitario: '32.5', cubagem: '0.75' },
      { comprimento: '3,5m', pesoUnitario: '36.0', cubagem: '0.88' },
      { comprimento: '4,0m', pesoUnitario: '41.5', cubagem: '1.00' },
      { comprimento: '5,0m', pesoUnitario: '54.0', cubagem: '1.25' },
      { comprimento: '6,0m', pesoUnitario: '62.5', cubagem: '1.50' }
    ]
  },
  // Série P63 (Ultra-pesada)
  {
    id: 'trelica_p63',
    name: 'Treliça P63',
    category: 'Treliças Série P',
    description: 'Box truss P63, ultra-resistente, para estruturas mega eventos.',
    specs: { 'Perfil': 'P63', 'Material': 'Alumínio 6061-T6', 'Série': 'Ultra-Pesada' },
    keywords: ['treliça', 'p63', 'box truss', 'ultra', 'pesada', 'megaevento'],
    technicalData: [
      { comprimento: '1,0m', pesoUnitario: '17.04', cubagem: '0.18' },
      { comprimento: '2,0m', pesoUnitario: '26.28', cubagem: '0.36' },
      { comprimento: '3,0m', pesoUnitario: '35.48', cubagem: '0.54' },
      { comprimento: '4,0m', pesoUnitario: '44.64', cubagem: '0.72' },
      { comprimento: '5,0m', pesoUnitario: '54.02', cubagem: '0.90' },
      { comprimento: '6,0m', pesoUnitario: '62.98', cubagem: '1.08' }
    ]
  },
  // Palco Stage
  {
    id: 'palco_stage',
    name: 'Palco Stage',
    category: 'Palcos',
    description: 'Sistema modular de palco com plataforma ajustável em várias alturas. Carga: 700kg/m². Piso compensado 25mm antiderrapante.',
    specs: { 'Altura': 'Regulável', 'Carga': '700kg/m²', 'Piso': 'Compensado 25mm' },
    keywords: ['palco', 'stage', 'plataforma', 'palco', 'altura', 'modular'],
    technicalData: [
      { altura: '0,8m', pesoUnitario: '45', cubagem: '0.35' },
      { altura: '1,2m', pesoUnitario: '55', cubagem: '0.42' },
      { altura: '1,6m', pesoUnitario: '65', cubagem: '0.50' },
      { altura: '2,0m', pesoUnitario: '75', cubagem: '0.60' },
      { altura: '2,2m', pesoUnitario: '85', cubagem: '0.68' }
    ]
  },
  // Barricada
  {
    id: 'barricada',
    name: 'Barricada',
    category: 'Segurança',
    description: 'Sistema de barricada em alumínio para contenção e organização de público em eventos.',
    specs: { 'Material': 'Alumínio 6061-T6', 'Altura': '1,0m a 1,2m', 'Aplicação': 'Shows e eventos' },
    keywords: ['barricada', 'grade', 'segurança', 'público', 'contenção'],
    technicalData: [
      { altura: '1,0m', pesoUnitario: '34', cubagem: '0.13' },
      { altura: '1,1m', pesoUnitario: '34', cubagem: '0.13' },
      { altura: '1,2m', pesoUnitario: '36', cubagem: '0.19' }
    ]
  },
  // Praticável
  {
    id: 'praticavel',
    name: 'Praticável',
    category: 'Acessórios',
    description: 'Plataforma de alumínio com piso compensado, para acesso e estruturas baixas.',
    specs: { 'Material': 'Alumínio + Compensado', 'Aplicação': 'Acesso, estruturas baixas' },
    keywords: [
      'praticável', 'praticavel', 'plataforma', 'piso', 'acesso',
      'praticavel 2x1', 'praticavel 2 x 1', 'praticavel 2x1m', 'praticavel 2 x 1m',
      'plataforma 2x1', 'plataforma 2 x 1', 'plataforma 2x1m', 'plataforma 2 x 1m',
      'praticavel 1x1', 'praticavel 1 x 1', 'praticavel 1x1m', 'praticavel 1 x 1m',
      'praticavel 1,0x1,0', 'praticavel 2,0x1,0', 'praticavel 2,0x0,5',
      'praticavel 1,0x0,5', 'praticavel 1,5x1,0',
      'plataforma 1x1', 'plataforma 1 x 1', 'plataforma 1x1m', 'plataforma 1 x 1m',
      'plataforma 1,0x1,0', 'plataforma 2,0x1,0', 'plataforma 2,0x0,5',
      'plataforma 1,0x0,5', 'plataforma 1,5x1,0'
    ],
    technicalData: [
      { comprimento: '1,0x0,5m', pesoUnitario: '18', cubagem: '0.05' },
      { comprimento: '1,0x1,0m', pesoUnitario: '23.6', cubagem: '0.10' },
      { comprimento: '1,5x1,0m', pesoUnitario: '33', cubagem: '0.10' },
      { comprimento: '2,0x0,5m', pesoUnitario: '20', cubagem: '0.10' },
      { comprimento: '2,0x1,0m', pesoUnitario: '38.7', cubagem: '0.20' }
    ]
  },
  // P30 Sleeves e cubos
  {
    id: 'p30_conectores',
    name: 'P30 - Conectores e Cubos',
    category: 'Conectores',
    description: 'Conectores especiais P30: sleeves reduzidos, cubos e articulações para montagens complexas.',
    specs: { 'Série': 'P30', 'Tipo': 'Conectores variados' },
    keywords: ['p30', 'sleeve', 'cubo', 'conector', 'articulação', 'conexão'],
    technicalData: [
      { comprimento: 'Sleeve Reduzido 4 Faces', pesoUnitario: '16.2', cubagem: '0.08' },
      { comprimento: 'Cubo 4 Faces', pesoUnitario: '10', cubagem: '0.05' },
      { comprimento: 'Cubo 5 Faces', pesoUnitario: '10.86', cubagem: '0.03' },
      { comprimento: 'Cubo 15° 2 Faces', pesoUnitario: '6.15', cubagem: '0.01' },
      { comprimento: 'Cubo 45° 3 Faces', pesoUnitario: '10.5', cubagem: '0.02' }
    ]
  },
  // Rampa de Carga
  {
    id: 'rampa_carga',
    name: 'Rampa de Carga',
    category: 'Acessórios',
    description: 'Rampas em alumínio com compensado para carga e descarga de equipamentos.',
    specs: { 'Material': 'Alumínio + Compensado', 'Inclinação': 'Padrão' },
    keywords: ['rampa', 'carga', 'descarga', 'rampa carga'],
    technicalData: [
      { comprimento: '3,0m', pesoUnitario: '60', cubagem: '0.30' },
      { comprimento: '4,0m', pesoUnitario: '75.3', cubagem: '0.44' },
      { comprimento: '5,0m', pesoUnitario: '99', cubagem: '0.55' },
      { comprimento: '6,0m', pesoUnitario: '120', cubagem: '0.66' }
    ]
  }
];

// FAQ da ArteShow
const faqDatabase: FAQ[] = [
  {
    id: 'faq_001',
    category: 'empresa',
    question_keywords: ['quem é', 'empresa', 'arteshow', 'sobre vocês', 'história'],
    answer: 'A ArteShow Estruturas em Alumínio trabalha com locação e fabricação de estruturas para eventos, palcos, camarins, box truss, escadas, pórticos e soluções completas em alumínio. Estamos em Araquari-SC com 6.800m² de parque fabril e mais de 10 anos de experiência.'
  },
  {
    id: 'faq_002',
    category: 'contato',
    question_keywords: ['contato', 'telefone', 'whatsapp', 'falar', 'atendimento'],
    answer: 'Você pode falar diretamente com nosso time comercial para dúvidas, orçamentos ou atendimento. Acesse nosso site: https://arteshowestruturas.com.br\n📍 Rua Antônio Amorim, 741 - Araquari, SC'
  },
  {
    id: 'faq_003',
    category: 'instagram',
    question_keywords: ['instagram', 'fotos', 'portfolio', 'trabalhos', 'projetos'],
    answer: 'Claro! Veja nossos projetos e estruturas no Instagram oficial: https://www.instagram.com/arteshowestrutura'
  },
  {
    id: 'faq_004',
    category: 'preco',
    question_keywords: ['preço', 'valor', 'quanto custa', 'cotação', 'orçamento'],
    answer: 'Os valores podem variar conforme quantidade, promoções e condições comerciais. Para preço atualizado, vou te direcionar para nosso time comercial.'
  },
  {
    id: 'faq_005',
    category: 'frete',
    question_keywords: ['frete', 'entrega', 'transporte', 'envio', 'caminhão', 'quanto sai'],
    answer: 'O frete depende da cidade/estado, peso e cubagem total. Para orçamento e cálculo de frete, entre em contato com nosso time comercial.'
  },
  {
    id: 'faq_006',
    category: 'peso_cubagem',
    question_keywords: ['peso', 'cubagem', 'm3', 'volume', 'medidas', 'dimensões'],
    answer: 'Sim! Eu consigo informar peso e cubagem unitária e calcular o total. Me diga o código ou nome do item e a quantidade que você precisa.'
  },
  {
    id: 'faq_007',
    category: 'locacao',
    question_keywords: ['locação', 'alugar', 'aluguel', 'evento', 'rental'],
    answer: 'Sim! Trabalhamos com locação de estruturas completas para eventos, incluindo palcos, camarins, pórticos e box truss. Para orçamento e disponibilidade, fale com nosso time comercial.'
  },
  {
    id: 'faq_008',
    category: 'fabricacao',
    question_keywords: ['fabricação', 'comprar', 'produzir', 'sob medida', 'personalizado'],
    answer: 'Sim! Também fabricamos estruturas em alumínio sob medida, conforme necessidade do evento ou projeto. Para orçamento, fale com nosso time comercial.'
  },
  {
    id: 'faq_009',
    category: 'montagem',
    question_keywords: ['montagem', 'montar', 'manual', 'instalação', 'como usar'],
    answer: 'A ArteShow fornece estruturas de alta qualidade. Para dúvidas técnicas e questões de montagem, recomendo conectar com nosso time comercial.'
  },
  {
    id: 'faq_010',
    category: 'tipos_estrutura',
    question_keywords: ['box truss', 'treliça', 'pórtico', 'palco', 'camarim', 'estrutura', 'produtos'],
    answer: 'Trabalhamos com:\n🏗️ Treliças (L20, L25, L30, P15, P25, P30, P38, P50, P63)\n🎭 Palco Stage modular\n⭐ Octashow (perfis octagonais)\n🚧 Barricadas\n🔧 Acessórios diversos\n\nQuer saber mais sobre algum produto específico?'
  }
];

// Configurações de regras do bot
const BOT_RULES = {
  can_answer: [
    'peso', 'cubagem', 'dimensoes', 'tipos de estruturas',
    'informacoes tecnicas', 'prazo medio de fabricacao',
    'formas de atendimento', 'orientacao de montagem',
    'diferenca entre produtos'
  ],
  cannot_answer: [
    'preco', 'valor', 'desconto', 'frete exato',
    'prazo exato de entrega', 'condicoes comerciais detalhadas'
  ],
  redirect_to_whatsapp_when: [
    'preço', 'valor', 'desconto', 'frete', 'orçamento',
    'proposta', 'contrato', 'negociação'
  ]
};

const botResponses: Record<string, { text: string; options?: { label: string; action: string }[] }> = {
  welcome: {
    text: 'Olá! Sou o Trelix 🤖⚙️, assistente da ArteShow Estruturas.\n\nPosso te ajudar com:\n✅ Informações técnicas de produtos\n✅ Peso e cubagem\n✅ Diferenças entre modelos\n\nMe diga o que você precisa!',
    options: [
      { label: 'Ver produtos', action: 'products' },
      { label: 'Solicitar orçamento', action: 'quote' },
      { label: 'Falar com vendas', action: 'show_sales_team' },
      { label: 'Conhecer empresa', action: 'company' }
    ]
  },
  products: {
    text: 'Temos uma linha completa de estruturas em alumínio:\n\n🏗️ Treliças (L20, L25, L30, P15, P25, P30, P38, P50, P63)\n🎭 Palco Stage modular\n⭐ Octashow (sistema premium)\n🚧 Barricadas e grades\n🔧 Acessórios diversos\n\nQual produto te interessa?',
    options: [
      { label: 'Treliças', action: 'trusses' },
      { label: 'Palcos', action: 'stages' },
      { label: 'Octashow', action: 'octashow_info' },
      { label: 'Voltar', action: 'welcome' }
    ]
  },
  trusses: {
    text: 'Nossas treliças são fabricadas em alumínio 6061-T6 com acabamento anodizado ou polido. Temos diversos perfis:\n\n📦 L20, L25, L30 (série leve)\n📦 P15, P25, P30 (série média)\n📦 P38, P50, P63 (série pesada - máxima carga)\n\nTodos com conexões por espigão e compatibilidade com sistemas do mercado.\n\nQuer mais detalhes técnicos ou falar com um especialista?',
    options: [
      { label: 'Peso/Cubagem', action: 'technical_info' },
      { label: 'Falar com especialista', action: 'show_sales_team' },
      { label: 'Voltar', action: 'products' }
    ]
  },
  stages: {
    text: 'O Palco Stage ArteShow é nosso carro-chefe! 🎭\n\n✅ Altura regulável até 2,2m\n✅ Capacidade de 700kg/m²\n✅ Piso compensado 25mm antiderrapante\n✅ Montagem rápida sem ferramentas especiais\n✅ Perfeito para shows, eventos corporativos e festivais\n\nQuer um orçamento?',
    options: [
      { label: 'Solicitar orçamento', action: 'quote' },
      { label: 'Mais produtos', action: 'products' }
    ]
  },
  octashow_info: {
    text: 'O Octashow é nosso sistema premium! ⭐\n\n✨ Perfis octagonais em alumínio\n✨ Chapas TS com encaixe rápido\n✨ Acabamento premium e exclusivo\n✨ Ideal para camarins, stands e estruturas especiais\n✨ Montagem elegante e moderna\n\nPerfeito para ambientes VIP e projetos exclusivos!',
    options: [
      { label: 'Solicitar orçamento', action: 'quote' },
      { label: 'Ver mais', action: 'products' }
    ]
  },
  technical_info: {
    text: 'Para informações técnicas de peso, cubagem e dimensões, preciso de detalhes:\n\n📦 Qual produto exatamente?\n📏 Qual tamanho/comprimento?\n🔢 Quantas unidades?\n\nMe passe essas informações que calculo tudo!',
    options: [
      { label: 'Ver produtos', action: 'products' },
      { label: 'Falar com especialista', action: 'show_sales_team' }
    ]
  },
  company: {
    text: 'A ArteShow Estruturas em Alumínio trabalha com locação e fabricação de estruturas para eventos desde 2015.\n\n🏭 6.800m² de parque fabril\n📍 Localizada em Araquari - SC\n👥 Equipe especializada de consultores\n🎯 Soluções personalizadas para cada evento\n\nTemos experiência em shows, festivals, eventos corporativos e muito mais!',
    options: [
      { label: 'Ver produtos', action: 'products' },
      { label: 'Falar com vendas', action: 'show_sales_team' },
      { label: 'Ver endereço', action: 'address' }
    ]
  },
  quote: {
    text: 'Perfeito! Para um orçamento personalizado, preciso de algumas informações:\n\n📅 Data do evento\n📍 Cidade/Estado\n🎪 Tipo de estrutura (treliça, palco, camarim, etc)\n📏 Aproximadamente quantos metros/unidades?\n\nOu você pode falar direto com nossa equipe pelo WhatsApp para orçamento rápido!',
    options: [
      { label: 'Falar com vendas', action: 'show_sales_team' },
      { label: 'Ver produtos', action: 'products' }
    ]
  },
  sales: {
    text: 'Nossa equipe comercial está pronta para atender você! 📞\n\n📱 WhatsApp: (47) 99745-4054\n☎️ Telefone: (47) 3438-3468\n📧 administrativo@arteshowestruturas.com.br\n\n⏰ Atendemos segunda a sexta, das 08 às 17h',
    options: [
      { label: 'Ver vendedores', action: 'show_sales_team' },
      { label: 'Voltar ao menu', action: 'welcome' }
    ]
  },
  address: {
    text: '📍 Nos encontre em:\n\nRua Antônio Amorim, 741\nPorto Grande, Araquari - SC\nCEP: 89245-000\n\nNosso parque fabril tem 6.800m² de área industrial de última geração!',
    options: [
      { label: 'Ver no mapa', action: 'map' },
      { label: 'Falar com vendas', action: 'show_sales_team' },
      { label: 'Voltar', action: 'welcome' }
    ]
  },
  help: {
    text: 'Posso ajudar com:\n\n❓ Informações sobre produtos\n🏗️ Diferenças entre estruturas\n💰 Orçamentos\n📞 Contato com vendas\n📍 Localização\n🚚 Transporte e frete\n\nO que você precisa?',
    options: [
      { label: 'Ver produtos', action: 'products' },
      { label: 'Orçamento', action: 'quote' },
      { label: 'Falar com vendas', action: 'show_sales_team' },
      { label: 'Voltar', action: 'welcome' }
    ]
  },
  all_products: {
    text: 'Vou te redirecionar para a página de produtos! Lá você encontra todos os detalhes da nossa linha completa.',
    options: [
      { label: 'Ir para produtos', action: 'navigate_products' }
    ]
  },
  contact: {
    text: 'Vou te levar para a página de contato! Lá você pode preencher o formulário ou ver todas as formas de contato.',
    options: [
      { label: 'Ir para contato', action: 'navigate_contact' }
    ]
  },
  whatsapp: {
    text: 'Abri o WhatsApp para você! Nossa equipe responde rapidinho! ⚡',
    options: [
      { label: 'Voltar ao menu', action: 'welcome' }
    ]
  },
  map: {
    text: 'Vou mostrar nosso endereço no mapa!',
    options: [
      { label: 'Ver no Google Maps', action: 'open_map' },
      { label: 'Voltar', action: 'welcome' }
    ]
  },
  price_request: {
    text: 'Os valores podem variar conforme quantidade, promoções e condições comerciais especiais.\n\nPara te passar o preço mais atualizado e competitivo, vou te conectar com um de nossos consultores! 📱',
    options: [
      { label: 'Falar com vendas', action: 'show_sales_team' },
      { label: 'Voltar', action: 'welcome' }
    ]
  },
  not_found: {
    text: 'Boa pergunta! 😊 Para eu te responder com precisão sobre esse produto específico ou peça personalizada, nossos consultores da equipe técnica podem ajudar mejor. Quer falar com eles?',
    options: [
      { label: 'Falar com especialista', action: 'show_sales_team' },
      { label: 'Ver produtos', action: 'products' }
    ]
  },
  default: {
    text: 'Desculpe, não entendi muito bem. 🤔\n\nPosso ajudar com:\n• Informações de produtos\n• Diferenças entre modelos\n• Orçamentos\n• Contato com vendas\n• Nosso endereço\n\nO que você precisa?',
    options: [
      { label: 'Ver produtos', action: 'products' },
      { label: 'Falar com vendas', action: 'show_sales_team' },
      { label: 'Ver mais opções', action: 'help' }
    ]
  }
};

export default function TrelixAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showSalesTeam, setShowSalesTeam] = useState(false);
  const [showConversationPrompt, setShowConversationPrompt] = useState(false);
  const [selectedSalesPersonPhone, setSelectedSalesPersonPhone] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setTimeout(() => {
        addBotMessage('welcome');
        setHasGreeted(true);
      }, 500);
    }
  }, [isOpen, hasGreeted]);

  // Busca FAQ por palavras-chave
  const searchFAQ = (userText: string): FAQ | null => {
    const lowerText = userText.toLowerCase();
    for (const faq of faqDatabase) {
      for (const keyword of faq.question_keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          return faq;
        }
      }
    }
    return null;
  };

  // Busca produto por nome
  const searchProduct = (userText: string): Product | null => {
    const lowerText = userText.toLowerCase();
    for (const product of products) {
      if (product.keywords?.some(kw => lowerText.includes(kw.toLowerCase()))) {
        return product;
      }
      if (lowerText.includes(product.name.toLowerCase())) {
        return product;
      }
    }
    return null;
  };

  // Verifica se é um pedido de redirecionamento para WhatsApp
  const shouldRedirectToWhatsApp = (userText: string): boolean => {
    const lowerText = userText.toLowerCase();
    return BOT_RULES.redirect_to_whatsapp_when.some(keyword =>
      lowerText.includes(keyword.toLowerCase())
    );
  };

  // Busca dados técnicos com suporte a quantidade
  const searchTechnicalData = (userText: string): { product: Product; matched: boolean; response: string } | null => {
    const lowerText = userText.toLowerCase();
    
    // Primeiro, tenta buscar série específica (P30, P50, L20, etc) - mais preciso
    let bestMatch: Product | null = null;
    let bestMatchScore = 0;
    
    const seriesKeywords = ['p63', 'p50', 'p38', 'p30', 'p25', 'p15', 'l30', 'l25', 'l20'];
    for (const series of seriesKeywords) {
      if (lowerText.includes(series)) {
        // Encontrou série específica, agora busca o produto dessa série
        for (const product of products) {
          if (product.name.toLowerCase().includes(series)) {
            bestMatch = product;
            bestMatchScore = 1000; // Prioridade máxima para série específica
            break;
          }
        }
        if (bestMatch) break;
      }
    }
    
    // Se não encontrou por série, busca por keywords genéricas
    if (!bestMatch || bestMatchScore < 1000) {
      for (const product of products) {
        for (const keyword of product.keywords || []) {
          if (lowerText.includes(keyword.toLowerCase())) {
            if (keyword.length > bestMatchScore) {
              bestMatch = product;
              bestMatchScore = keyword.length;
            }
          }
        }
      }
    }
    
    if (!bestMatch || !bestMatch.technicalData) {
      return null;
    }
    
    // Detecta se o usuário está pedindo para calcular múltiplos itens
    const hasMultipleQuantities = /(\d+)\s*(torres?|itens?|un|pç|peças?|unidades?|cubos?|sleeves?)\s*de\s*(\d+)/i.test(userText);
    const hasCalculationKeywords = /quanto|total|soma|calcula|tudo|emprestar/i.test(userText);
    
    if (hasMultipleQuantities && hasCalculationKeywords) {
      let response = `✅ *Encontrei isso:*\n\n📦 *${bestMatch.name}*\n${bestMatch.description}\n\n`;
      response += `📋 *Especificações Técnicas Unitárias:*\n`;
      
      bestMatch.technicalData.forEach((data) => {
        const dimension = data.comprimento || data.altura || data.diametro || 'unitário';
        const weight = parseFloat(data.pesoUnitario || '0');
        const volume = parseFloat(data.cubagem || '0');
        
        response += `\n• ${dimension}\n`;
        response += `  ⚖️ Peso: ${weight}kg\n`;
        response += `  📦 Cubagem: ${volume}m³\n`;
      });
      
      response += `\n⚠️ *Nota:* Ainda não fui treinado para calcular totalizações com múltiplos itens. Para orçamento e cálculos precisos, por favor fale com nosso time comercial! 📱\n`;
      
      return { product: bestMatch, matched: true, response };
    }
    
    // Resposta padrão - apenas dados unitários
    let response = `✅ *Encontrei isso:*\n\n📦 *${bestMatch.name}*\n${bestMatch.description}\n\n`;
    
    if (bestMatch.technicalData && bestMatch.technicalData.length > 0) {
      response += `📋 *Especificações Técnicas:*\n`;
      bestMatch.technicalData.forEach((data) => {
        const medidas = [];
        if (data.comprimento) medidas.push(`Comprimento: ${data.comprimento}`);
        if (data.altura) medidas.push(`Altura: ${data.altura}`);
        if (data.diametro) medidas.push(`Diâmetro: ${data.diametro}`);
        const weight = parseFloat(data.pesoUnitario || '0');
        const volume = parseFloat(data.cubagem || '0');
        response += `\n`;
        if (medidas.length > 0) {
          response += `• ${medidas.join(' | ')}\n`;
        }
        response += `  ⚖️ Peso Unitário: ${weight}kg\n`;
        response += `  📦 Cubagem Unitária: ${volume}m³\n`;
      });
      response += `\n💡 Para cálculos e orçamentos com múltiplos itens, fale com nosso time!\n`;
    }
    
    return { product: bestMatch, matched: true, response };
  };

  const addBotMessage = (action: string, customText?: string) => {
    const response = botResponses[action] || botResponses.default;
    const newMessage: Message = {
      id: Date.now(),
      text: customText || response.text,
      isUser: false,
      options: response.options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleUserMessage = (text: string, action?: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isUser: true
    };
    setMessages(prev => [...prev, newMessage]);

    // Handle special actions (botões de opções)
    if (action) {
      setTimeout(() => {
        handleAction(action);
      }, 500);
    } else {
      // Processamiento inteligente da mensagem
      setTimeout(() => {
        processUserMessage(text);
      }, 500);
    }
  };

  const processUserMessage = (text: string) => {
    // 1. Verificar se deve redirecionar para WhatsApp (preço, frete, etc)
    if (shouldRedirectToWhatsApp(text)) {
      addBotMessage('price_request');
      setTimeout(() => {
        setShowSalesTeam(true);
      }, 300);
      return;
    }

    // 2. Detecção prioritária de peso/cubagem/dimensões com dados técnicos
    const lowerText = text.toLowerCase();
    if (
      lowerText.includes('peso') ||
      lowerText.includes('cubagem') ||
      lowerText.includes('dimensão') ||
      lowerText.includes('medida') ||
      lowerText.includes('m³') ||
      lowerText.includes('kg') ||
      lowerText.includes('metro') ||
      lowerText.includes('altura') ||
      lowerText.includes('comprimento') ||
      lowerText.includes('tamanho')
    ) {
      const technicalData = searchTechnicalData(text);
      if (technicalData) {
        addBotMessage('custom', technicalData.response);
        return;
      }
      // Se não encontrou produto específico, pedir mais detalhes
      addBotMessage('technical_info');
      return;
    }

    // 3. Buscar em FAQ por palavras-chave
    const faqMatch = searchFAQ(text);
    if (faqMatch) {
      addBotMessage('custom', faqMatch.answer);
      return;
    }

    // 4. Buscar informações de produto
    const productMatch = searchProduct(text);
    if (productMatch) {
      let productInfo = `📦 ${productMatch.name}\n\n${productMatch.description}\n`;
      if (productMatch.specs) {
        productInfo += '\n✅ Especificações:\n';
        Object.entries(productMatch.specs).forEach(([key, value]) => {
          productInfo += `  • ${key}: ${value}\n`;
        });
      }
      productInfo += '\n\nQuer mais informações técnicas ou um orçamento?';
      addBotMessage('custom', productInfo);
      return;
    }

    // 5. Detecção de keywords para ações específicas
    if (lowerText.includes('empresa') || lowerText.includes('história')) {
      addBotMessage('company');
      return;
    }

    if (
      lowerText.includes('montag') ||
      lowerText.includes('instalar') ||
      lowerText.includes('como usar')
    ) {
      addBotMessage('custom', 'A ArteShow fornece estruturas de alta qualidade em alumínio. Para dúvidas sobre montagem e orientação técnica, recomendo conectar com nosso time comercial.');
      return;
    }

    if (lowerText.includes('horário') || lowerText.includes('aberto')) {
      addBotMessage('custom', '⏰ Horário de Atendimento:\n\nSegunda a Sexta: 08:00 - 17:00\n\nFora do horário, deixe mensagem para nosso time comercial que responderemos assim que possível!');
      return;
    }

    // 6. Fallback ao padrão
    addBotMessage('default');
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'custom':
        // Ação genérica para mensagens customizadas
        break;
      case 'navigate_products':
        document.querySelector('#produtos')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
        break;
      case 'navigate_contact':
        document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
        break;
      case 'whatsapp':
        setShowSalesTeam(true);
        break;
      case 'open_map':
        window.open('https://maps.google.com/?q=Rua+Antônio+Amorim,+741,+Araquari,+SC', '_blank');
        break;
      case 'show_sales_team':
        setShowSalesTeam(true);
        break;
      case 'price_request':
        // Mostrar consultores ao invés de redirecionar direto
        addBotMessage('price_request');
        setTimeout(() => {
          setShowSalesTeam(true);
        }, 300);
        break;
      default:
        addBotMessage(action);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleUserMessage(inputValue.trim());
      setInputValue('');
    }
  };

  // Formata a conversa para enviar via WhatsApp
  const formatConversationForWhatsApp = (): string => {
    if (messages.length === 0) return '';
    
    let formattedText = '📋 *Conversa com Trelix (Assistente ArteShow):*\n\n';
    
    messages.forEach((msg) => {
      if (msg.isUser) {
        formattedText += `👤 *Eu:*\n${msg.text}\n\n`;
      } else {
        formattedText += `🤖 *Trelix:*\n${msg.text}\n\n`;
      }
    });
    
    formattedText += '---\n\nContinue me ajudando com isso! 😊';
    return formattedText;
  };

  // Abre WhatsApp com conversa incluída
  const openWhatsAppWithConversation = (phoneNumber: string, includeConversation: boolean) => {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    let message = 'Olá! Gostaria de falar sobre estruturas da ArteShow.';
    
    if (includeConversation) {
      const conversation = formatConversationForWhatsApp();
      message = encodeURIComponent(conversation);
    } else {
      message = encodeURIComponent(message);
    }
    
    window.open(`https://wa.me/55${cleanPhone}?text=${message}`, '_blank');
    setShowConversationPrompt(false);
    setSelectedSalesPersonPhone(null);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="relative">
            {/* Pulse animation */}
            <div className="absolute inset-0 bg-[#B8FF3D] rounded-full animate-ping opacity-30" />
            
            {/* Trelix Avatar */}
            <div className="relative w-16 h-16 bg-[#0B0C0E] border-2 border-[#B8FF3D] rounded-full overflow-hidden shadow-lg hover:scale-110 transition-transform">
              <img
                src="/images/TRELIX.png"
                alt="Trelix"
                className="w-full h-full object-contain p-1"
              />
            </div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#0B0C0E] border border-[#1a1b1f] px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm text-[#F6F7F9]">Precisa de ajuda?</span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-[#0B0C0E] border-r border-b border-[#1a1b1f] rotate-[-45deg]" />
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
          <div className="bg-[#0B0C0E] border border-[#1a1b1f] rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1a1b1f] to-[#0f1014] p-4 flex items-center justify-between border-b border-[#1a1b1f]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0B0C0E] border border-[#B8FF3D]/30 rounded-full overflow-hidden">
                  <img
                    src="/images/TRELIX.png"
                    alt="Trelix"
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#F6F7F9]">Trelix</h4>
                  <p className="text-xs text-[#B8FF3D]">Assistente ArteShow</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-[#1a1b1f] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#A6AAB6]" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full text-[#5a5b5f]">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 opacity-50">
                      <img
                        src="/images/TRELIX.png"
                        alt="Trelix"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm">Iniciando conversa...</p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      message.isUser
                        ? 'bg-[#B8FF3D] text-[#0B0C0E] rounded-2xl rounded-br-sm'
                        : 'bg-[#1a1b1f] text-[#F6F7F9] rounded-2xl rounded-bl-sm'
                    } p-3`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    
                    {/* Options */}
                    {!message.isUser && message.options && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleUserMessage(option.label, option.action)}
                            className="text-xs bg-[#0B0C0E] hover:bg-[#2a2b2f] text-[#B8FF3D] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                          >
                            {option.label}
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Sales Team List */}
              {showSalesTeam && !showConversationPrompt && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-[#1a1b1f] text-[#F6F7F9] rounded-2xl rounded-bl-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-[#B8FF3D]" />
                      <span className="text-sm font-semibold">Equipe Comercial</span>
                    </div>
                    <p className="text-xs text-[#A6AAB6] mb-3">
                      Escolha um consultor para falar pelo WhatsApp:
                    </p>
                    <div className="space-y-2">
                      {salesTeam.map((member, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedSalesPersonPhone(member.phone);
                            setShowConversationPrompt(true);
                          }}
                          className="w-full flex items-center gap-2 p-2 bg-[#0B0C0E] rounded hover:bg-[#2a2b2f] transition-colors group"
                        >
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0 text-left">
                            <div className="text-xs font-medium text-[#F6F7F9] truncate">{member.name}</div>
                            <div className="text-[10px] text-[#A6AAB6]">{member.role}</div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <MessageCircle className="w-3 h-3 text-[#B8FF3D] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowSalesTeam(false)}
                      className="mt-3 text-xs text-[#B8FF3D] hover:underline"
                    >
                      Voltar ao menu
                    </button>
                  </div>
                </div>
              )}

              {/* Conversation Prompt */}
              {showConversationPrompt && selectedSalesPersonPhone && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-[#1a1b1f] text-[#F6F7F9] rounded-2xl rounded-bl-sm p-4">
                    <p className="text-sm mb-4">
                      Quer adicionar nossa conversa na mensagem? Assim o consultor já saberá do que você precisa! 📝
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          openWhatsAppWithConversation(selectedSalesPersonPhone, true);
                        }}
                        className="w-full bg-[#B8FF3D] text-[#0B0C0E] hover:bg-[#a8ef2d] text-xs font-medium py-2 px-3 rounded transition-colors"
                      >
                        ✅ Sim, incluir conversa
                      </button>
                      <button
                        onClick={() => {
                          openWhatsAppWithConversation(selectedSalesPersonPhone, false);
                        }}
                        className="w-full bg-[#0B0C0E] text-[#B8FF3D] hover:bg-[#2a2b2f] text-xs font-medium py-2 px-3 rounded border border-[#B8FF3D] transition-colors"
                      >
                        ❌ Não, abrir só o WhatsApp
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setShowConversationPrompt(false);
                        setSelectedSalesPersonPhone(null);
                      }}
                      className="mt-3 text-xs text-[#A6AAB6] hover:text-[#F6F7F9] w-full text-center"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-[#1a1b1f] flex gap-2 overflow-x-auto">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleUserMessage(reply.label, reply.action)}
                  className="flex items-center gap-1.5 text-xs bg-[#1a1b1f] hover:bg-[#2a2b2f] text-[#A6AAB6] px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                >
                  <reply.icon className="w-3 h-3" />
                  {reply.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[#1a1b1f]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-[#1a1b1f] border border-[#2a2b2f] rounded-full px-4 py-2 text-sm text-[#F6F7F9] placeholder:text-[#5a5b5f] focus:outline-none focus:border-[#B8FF3D]"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-[#B8FF3D] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a8ef2d] transition-colors"
                >
                  <Send className="w-4 h-4 text-[#0B0C0E]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
