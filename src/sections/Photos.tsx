import MediaCarousel, { type MediaItem } from '../components/custom/MediaCarousel';

const PHOTOS_PATH = '/images/Aba Fotos/';

// Lista de imagens e vídeos reais
const mediaItems: MediaItem[] = [
  { src: PHOTOS_PATH + 'ARTEShow-Brasil.png', filename: 'ARTEShow-Brasil.png', type: 'image' },
  { src: PHOTOS_PATH + 'CargaSaveiro.jpg', filename: 'CargaSaveiro.jpg', type: 'image' },
  { src: PHOTOS_PATH + 'Cliente2.jpeg', filename: 'Cliente2.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'Cliente3.jpeg', filename: 'Cliente3.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'Cliente4.jpeg', filename: 'Cliente4.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'Cliente1.jpeg', filename: 'Cliente1.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'Coração.jpg', filename: 'Coração.jpg', type: 'image' },
  { src: PHOTOS_PATH + 'equipe-evento.png', filename: 'equipe-evento.png', type: 'image' },
  { src: PHOTOS_PATH + 'Estrutura_sendo_montada.jpg', filename: 'Estrutura_sendo_montada.jpg', type: 'image' },
  { src: PHOTOS_PATH + 'Estruturas1.jpeg', filename: 'Estruturas1.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'Estruturas2.jpeg', filename: 'Estruturas2.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'Estruturas3.jpeg', filename: 'Estruturas3.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'Estruturas4.jpeg', filename: 'Estruturas4.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'Estruturas2.jpg', filename: 'Estruturas2.jpg', type: 'image' },
  { src: PHOTOS_PATH + 'Fabrica2.jpeg', filename: 'Fabrica2.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'Fabrica3.jpeg', filename: 'Fabrica3.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'FabricaAS2.JPG', filename: 'FabricaAS2.JPG', type: 'image' },
  { src: PHOTOS_PATH + 'Octa1.jpeg', filename: 'Octa1.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'Octashow1.jpg', filename: 'Octashow1.jpg', type: 'image' },
  { src: PHOTOS_PATH + 'Octashow2.JPG', filename: 'Octashow2.JPG', type: 'image' },
  { src: PHOTOS_PATH + 'palco_1.JPG', filename: 'palco_1.JPG', type: 'image' },
  { src: PHOTOS_PATH + 'PerfilForro.JPG', filename: 'PerfilForro.JPG', type: 'image' },
  { src: PHOTOS_PATH + 'PerfilOcta.MP4', filename: 'PerfilOcta.MP4', type: 'video' },
  { src: PHOTOS_PATH + 'PerfilOctogonal1.JPG', filename: 'PerfilOctogonal1.JPG', type: 'image' },
  { src: PHOTOS_PATH + 'PerfilOctogonal2.JPG', filename: 'PerfilOctogonal2.JPG', type: 'image' },
  { src: PHOTOS_PATH + 'PerfilOctogonal3.JPG', filename: 'PerfilOctogonal3.JPG', type: 'image' },
  { src: PHOTOS_PATH + 'PerfilOctogonal4.JPG', filename: 'PerfilOctogonal4.JPG', type: 'image' },
  { src: PHOTOS_PATH + 'PerfilOctogonal5.JPG', filename: 'PerfilOctogonal5.JPG', type: 'image' },
  { src: PHOTOS_PATH + 'Pessoas_no_Palco.JPG', filename: 'Pessoas_no_Palco.JPG', type: 'image' },
  { src: PHOTOS_PATH + 'Torres.jpg', filename: 'Torres.jpg', type: 'image' },
  { src: PHOTOS_PATH + 'Trave.jpg', filename: 'Trave.jpg', type: 'image' },
  { src: PHOTOS_PATH + 'TraveAS.jpg', filename: 'TraveAS.jpg', type: 'image' },
  { src: PHOTOS_PATH + 'TraveCirculo.jpg', filename: 'TraveCirculo.jpg', type: 'image' },
  { src: PHOTOS_PATH + 'TRELIX2.jpeg', filename: 'TRELIX2.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'TrelixFabrica.jpeg', filename: 'TrelixFabrica.jpeg', type: 'image' },
  { src: PHOTOS_PATH + 'Octashow1.MP4', filename: 'Octashow1.MP4', type: 'video' },
  { src: PHOTOS_PATH + 'Octashow2.MP4', filename: 'Octashow2.MP4', type: 'video' },
  { src: PHOTOS_PATH + 'OctashowMontado1.MP4', filename: 'OctashowMontado1.MP4', type: 'video' },
  { src: PHOTOS_PATH + 'OctashowMontado2.MP4', filename: 'OctashowMontado2.MP4', type: 'video' },
  { src: PHOTOS_PATH + 'OctashowMontado3.MP4', filename: 'OctashowMontado3.MP4', type: 'video' },
  { src: PHOTOS_PATH + 'OctashowMontado4.MP4', filename: 'OctashowMontado4.MP4', type: 'video' },
  { src: PHOTOS_PATH + 'Octagonal.MP4', filename: 'Octagonal.MP4', type: 'video' },
  { src: PHOTOS_PATH + 'Semanaudio.MP4', filename: 'Semanaudio.MP4', type: 'video' }
];

const Photos: React.FC = () => {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Fotos e Vídeos</h2>
      <MediaCarousel items={mediaItems} />
      <p className="mt-4 text-sm text-gray-500">
        Para baixar imagens, utilize o botão de download na visualização individual. 
        Vídeos podem ser assistidos em Picture-in-Picture.
      </p>
    </section>
  );
};

export default Photos;
