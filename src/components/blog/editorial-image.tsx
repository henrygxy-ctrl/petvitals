import Image from "next/image";

export interface EditorialImageProps {
  src: string;
  alt: string;
  caption: string;
}

export function EditorialImage({ src, alt, caption }: EditorialImageProps) {
  return (
    <figure className="not-prose mx-auto my-8 w-full max-w-3xl">
      <Image
        src={src}
        alt={alt}
        width={1536}
        height={1024}
        sizes="(max-width: 767px) calc(100vw - 32px), 768px"
        loading="lazy"
        className="aspect-[3/2] h-auto w-full rounded-lg"
      />
      <figcaption className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {caption} <span>AI-generated illustration.</span>
      </figcaption>
    </figure>
  );
}
