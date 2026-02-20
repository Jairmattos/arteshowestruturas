# 📸 Guia: Como Adicionar Imagens no Site

## 1. Estrutura de Pastas

As imagens do projeto ficam em:
```
public/
  images/
    - Fachada.jpeg
    - trelix-real.jpeg
    - equipe-evento.jpeg
    - Logomarca.jpeg
    - TRELIX.png
```

## 2. Como Adicionar Imagens Locais

### Passo 1: Copiar a Imagem
1. Coloque sua imagem na pasta `public/images/`
2. Use nomes descritivos: `palco-evento.jpeg`, `treliça-produto.jpeg`, etc.
3. Formatos recomendados: `.jpeg`, `.png`, `.webp`

### Passo 2: Referenciar no Código
No código, use o caminho relativo começando com `/images/`:

```tsx
// Exemplo
image: '/images/palco-evento.jpeg'
```

---

## 3. Adicionar Imagens no Carrossel (Hero)

**Arquivo:** `src/components/custom/ImageCarousel.tsx`

### Passo 1: Adicione a Imagem na Array

```tsx
const carouselImages: CarouselImage[] = [
  {
    src: '/images/sua-imagem.jpeg',
    alt: 'Descrição da imagem',
    caption: 'Texto que aparece sobre a imagem'
  },
  // ... mais imagens
];
```

### Exemplo Prático:
```tsx
{
  src: '/images/palco-especial.jpeg',
  alt: 'Palco modulável para eventos',
  caption: 'Palco modulável - Capacidade até 2.2m de altura'
}
```

---

## 4. Adicionar Imagens nos Produtos

**Arquivo:** `src/sections/Products.tsx`

### Passo 1: Localize o Array de Produtos

```tsx
const products: Product[] = [
  // Aqui estão os produtos
];
```

### Passo 2: Adicione um Novo Produto ou Edite Existente

```tsx
{
  id: 'seu-produto',
  name: 'Nome do Produto',
  description: 'Descrição do produto',
  image: '/images/seu-produto.jpeg',  // ← Use o caminho aqui
  features: [
    'Característica 1',
    'Característica 2',
    'Característica 3',
    'Característica 4'
  ],
  specs: [
    { label: 'Especificação 1', value: 'Valor' },
    { label: 'Especificação 2', value: 'Valor' },
    { label: 'Especificação 3', value: 'Valor' },
    { label: 'Material', value: 'Alumínio, etc' }
  ],
  category: 'Categoria'
}
```

### Exemplo Completo - Palco Stage com Imagem Local:
```tsx
{
  id: 'palcos',
  name: 'Palco Stage',
  description: 'Sistema modular de palcos com plataformas ajustáveis.',
  image: '/images/palco-evento.jpeg',  // ← Mudou de URL para local
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
}
```

---

## 5. Produtos que Precisam de Imagens

Atual state com imagens do Unsplash (placeholder):

| ID | Nome | Arquivo Sugerido | Status |
|---|---|---|---|
| **trelicas** | Treliças | `/images/trelicas.jpeg` | ❌ Usar Unsplash |
| **palcos** | Palco Stage | `/images/palco-stage.jpeg` | ❌ Usar Unsplash |
| **octashow** | Octashow | `/images/octashow.jpeg` | ❌ Usar Unsplash |
| **barricadas** | Barricadas | `/images/barricadas.jpeg` | ❌ Usar Unsplash |
| **acessorios** | Acessórios | `/images/acessorios.jpeg` | ❌ Usar Unsplash |
| **backdrop** | Backdrop & Pórticos | `/images/backdrop.jpeg` | ❌ Usar Unsplash |

---

## 6. Otimização de Imagens

### Tamanho Recomendado
- **Largura:** 800-1200px
- **Altura:** 600-900px (mantendo proporção)
- **Tamanho do arquivo:** 100-300KB

### Ferramentas Úteis
- **TinyPNG** (https://tinypng.com/) - Compacta JPG e PNG
- **Squoosh** (https://squoosh.app/) - Otimização online
- **ImageOptim** (Mac) ou **PNGQuant** (Win) - Ferramentas locais

---

## 7. Responsividade

### ✅ O carrossel agora está otimizado para:
- **Desktop:** Mantém proporção 16:9
- **Tablet:** Escala responsiva com `max-h-full`
- **Mobile:** Imagens proporciocinais com `object-contain`

A imagem nunca será cortada - ela sempre se encaixa perfeitamente!

---

## 8. Usando URLs Externas

Se preferir usar URLs diretas (Unsplash, Pexels, etc):

```tsx
image: 'https://images.unsplash.com/photo-xxx?q=80&w=1000&auto=format&fit=crop'
```

---

## 9. Checklist para Adicionar Imagem

- [ ] Imagem copiada para `public/images/`
- [ ] Nome do arquivo é descritivo
- [ ] Imagem está otimizada (< 300KB)
- [ ] Objeto no código tem `id`, `name`, `description`, `image`, `features`, `specs`
- [ ] Campo `image` aponta para o arquivo correto (`/images/seu-arquivo.jpeg`)
- [ ] Preview no browser está ok
- [ ] Imagem aparecer corretamente em mobile e desktop

---

## 10. Depois de Fazer Alterações

1. Salve os arquivos
2. O servidor dev recarrega automaticamente
3. Verifique no preview se tudo está ok

Pronto! 🎉 Suas imagens estão prontas!
