import { useState } from "react";

const faqData = [
  {
    question: "A ArteShow trabalha com estruturas de ferro?",
    answer:
      "Não. Trabalhamos exclusivamente com estruturas em alumínio 6061-T6. Não fabricamos nem vendemos estruturas de ferro."
  },
  {
    question: "A ArteShow aluga estruturas?",
    answer:
      "Não trabalhamos com locação. Atuamos exclusivamente com venda de estruturas."
  },
  {
    question: "Vocês trabalham com Linha Q?",
    answer:
      "Não trabalhamos com Linha Q. Utilizamos as linhas L (leve), P (pesada) e PS (Palco Stage), comparáveis à Linha Q de outras empresas."
  },
  {
    question: "Quais linhas vocês trabalham?",
    answer:
      "Trabalhamos com L20, L25, P15, P20, P25, P30, P38, P50 e outras sob consulta."
  },
  {
    question: "Qual linha usar para palco 10x8?",
    answer:
      "Normalmente recomendamos P30 ou Palco Stage (PS), dependendo do tipo de evento e carga prevista."
  },
  {
    question: "Qual o vão máximo recomendado?",
    answer:
      "Até 4m → L20\nAté 6m → P20\nAté 8m → P30\nAté 10m → P38\nAcima disso → P50 (sob análise técnica)."
  },
  {
    question: "Vocês fazem projetos personalizados?",
    answer:
      "Sim. Para medidas fora do padrão de 0,5m até 6m, recomendamos projeto personalizado com validação do nosso time técnico."
  },
  {
    question: "Quais alturas de torres vocês possuem?",
    answer:
      "Torres de 0,5m até 6m, em incrementos de 0,5m. Para alturas maiores, analisamos composição estrutural."
  },
  {
    question: "Vocês fornecem cubos e acessórios?",
    answer:
      "Sim. Trabalhamos com cubos retos, cubos inclinados, sleeves, pau de carga, cumeeiras, canga, algemas simples e duplas, grepos e bases."
  },
  {
    question: "Trabalham com barricadas e grades?",
    answer:
      "Sim. Temos barricadas, grades de contenção, guarda-corpo de 1m e 2m, escadas e rampas de acesso."
  },
  {
    question: "Qual o padrão dos praticáveis?",
    answer:
      "Praticável PS padrão 2x1m. Também temos 1x1m, 1x0,5m e 2x0,5m. Altura padrão 10cm ou modelo baixo com 5cm."
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Entrada parcelada até a entrega da produção. Temos parcelamento em Cheque, Boleto e cartão de crédito. Definido no orçamento, pois cada forma define quantidade de parcelas."
  },
  {
    question: "Vocês entregam para todo o Brasil?",
    answer:
      "Sim. Realizamos vendas para todo o Brasil mediante orçamento e negociação de frete."
  },
   {
    question: "O que é o Trelix?",
    answer:
      "Trelix é o nosso mascote. Nasceu em Setembro de 2025 e foi apresentado na Semanáudio de Curitiba em Outubro 2025."
  },
   {
    question: "Porque Trelix como nome?",
    answer:
      "Trelix vem da junção das iniciais de 'TRELiça' e do 'IX' da Fênix, simbolizando a força e a renovação das estruturas que ofere"
  },
  {
    question: "O Trelix substitui um consultor técnico?",
    answer:
      "Não. O Trelix faz uma pré-análise automatizada. O projeto final é validado por nossa equipe técnica especializada."
  },
  {
    question: "Como solicitar um orçamento?",
    answer:
      "Você pode falar diretamente com nosso time comercial ou usar o Trelix para iniciar uma pré-análise técnica."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#0B0C0E] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#B8FF3D]">
          Perguntas Frequentes
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-zinc-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-4 bg-[#141518] hover:bg-[#1c1d22] transition-all duration-300 font-semibold flex justify-between items-center"
              >
                {item.question}
                <span className="text-[#B8FF3D] text-xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              <div
                className={`px-6 transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "max-h-96 py-4 opacity-100"
                    : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                <p className="text-zinc-300 whitespace-pre-line">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}