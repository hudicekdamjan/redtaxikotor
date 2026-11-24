// Used only by the single-file preview build (vite.config.single.ts): images are inlined as data URIs.
const files = import.meta.glob('../../public/images/*-800.webp', { eager: true, import: 'default', query: '?inline' }) as Record<string, string>
export const imageUrl = (file: string, _width: 800 | 1600) => files[`../../public/images/${file}-800.webp`]
