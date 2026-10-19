"use client";

import { useState } from "react";
import type { MediaItem } from "@/shared/ui/Lightbox/types";
import { Lightbox } from "@/shared/ui/Lightbox/Lightbox";
import { ImageCard } from "../ImageCard/ImageCard";

type ProjectMediaProps = {
  items: MediaItem[];
  title: string;
};

// Gallery card + lightbox: shares the current slide between the two
export function ProjectMedia({ items, title }: ProjectMediaProps) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasMany = items.length > 1;

  const goTo = (next: number) => {
    if (!hasMany) return;
    const normalizedIndex = (next + items.length) % items.length;
    setDir(next > idx || (idx === items.length - 1 && next === 0) ? 1 : -1);
    setIdx(normalizedIndex);
  };

  const openLightbox = (startAt = idx) => {
    setIdx(startAt);
    setLightboxOpen(true);
  };

  return (
    <>
      <ImageCard
        items={items}
        idx={idx}
        dir={dir}
        hasMany={hasMany}
        title={title}
        onPrev={() => goTo(idx - 1)}
        onNext={() => goTo(idx + 1)}
        onGoTo={goTo}
        onOpenLightbox={openLightbox}
      />

      {lightboxOpen && items.length > 0 && (
        <Lightbox
          items={items}
          index={idx}
          setIndex={setIdx}
          onClose={() => setLightboxOpen(false)}
          title={title}
        />
      )}
    </>
  );
}
