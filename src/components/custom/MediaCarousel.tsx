import React, { useRef, useState } from 'react';

export interface MediaItem {
  src: string;
  filename: string;
  type: 'image' | 'video';
}

interface MediaCarouselProps {
  items: MediaItem[];
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const [validItems, setValidItems] = useState<MediaItem[]>(items);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Remove itens que não carregam
  const handleMediaError = (idx: number) => {
    setValidItems((prev) => {
      const filtered = prev.filter((_, i) => i !== idx);
      if (current >= filtered.length) setCurrent(Math.max(0, filtered.length - 1));
      return filtered;
    });
  };

  const goTo = (idx: number) => {
  if (validItems.length === 0) return;
  setCurrent((idx + validItems.length) % validItems.length);
};


  const handlePiP = (idx: number) => {
    const video = videoRefs.current[idx];
    if (video && video.requestPictureInPicture) {
      video.requestPictureInPicture();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="overflow-hidden rounded shadow bg-white flex items-center justify-center h-80">
        {validItems.length > 0 && validItems[current].type === 'image' ? (
          <img
            src={validItems[current].src}
            alt={validItems[current].filename}
            className="object-contain w-full h-80 bg-white"
            onError={() => handleMediaError(current)}
          />
        ) : validItems.length > 0 && validItems[current].type === 'video' ? (
          <div className="relative w-full h-80 flex items-center justify-center">
            <video
              ref={(el) => {
                videoRefs.current[current] = el;
              }}
              src={validItems[current].src}
              controls
              className="object-contain w-full h-80 bg-black"
              onError={() => handleMediaError(current)}
            />
            <button
              className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-xs"
              onClick={() => handlePiP(current)}
            >
              Picture-in-Picture
            </button>
          </div>
        ) : (
          <div className="text-center w-full h-80 flex items-center justify-center text-gray-500">
            Nenhuma mídia disponível
          </div>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {validItems.map((item, idx) => (
          <button
            key={item.src}
            className={`w-12 h-12 border rounded overflow-hidden focus:outline-none ${
              idx === current ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => goTo(idx)}
            aria-label={`Ver mídia ${idx + 1}`}
          >
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.filename}
                className="object-cover w-full h-full"
                onError={() => handleMediaError(idx)}
              />
            ) : (
              <video
                src={item.src}
                className="object-cover w-full h-full"
                onError={() => handleMediaError(idx)}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-2">
        <button
          onClick={() => goTo(current - 1)}
          className="px-3 py-1 bg-gray-200 rounded"
          disabled={validItems.length === 0}
        >
          Anterior
        </button>
        <button
          onClick={() => goTo(current + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
          disabled={validItems.length === 0}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default MediaCarousel;
