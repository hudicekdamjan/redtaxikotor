import { IMAGES, type ImageKey } from '../config/images'
import { useLang } from '../context/LangContext'
import { imageUrl } from '../config/imageUrl'

/** Responsive WebP image from config/images.ts */
export default function Img({ name, className = '', sizes = '100vw', priority = false, alt }: { name: ImageKey; className?: string; sizes?: string; priority?: boolean; alt?: string }) {
  const { lang } = useLang()
  const img = IMAGES[name]
  return (
    <img
      src={imageUrl(img.file, 1600)}
      srcSet={import.meta.env.VITE_SINGLE ? undefined : `${imageUrl(img.file, 800)} 800w, ${imageUrl(img.file, 1600)} 1600w`}
      sizes={sizes}
      width={img.w}
      height={img.h}
      alt={alt ?? img.alt[lang]}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
    />
  )
}
