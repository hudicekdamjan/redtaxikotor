export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 48 36" className="h-8 w-auto shrink-0" aria-hidden="true">
        <path fillRule="evenodd" d="M6 4h22c7 0 11 4 11 10 0 4.6-2.6 8-7 9.3L39 34h-9.5l-6-9.8H16L13.8 34H5ZM17.6 11.2h8.6c2.4 0 3.8 1.2 3.8 3.2 0 2.2-1.6 3.4-4.2 3.4h-9.6Z" fill="#D71920" />
        <path d="M0 9h10l-1 3H0Zm2 6h7l-1 3H2Z" fill="#D71920" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[19px] font-extrabold italic tracking-tight"><span className="text-red">RED</span> TAXI</span>
        <span className="mt-1 block text-[9.5px] font-semibold uppercase tracking-[0.32em] opacity-70">Kotor · Tivat</span>
      </span>
    </span>
  )
}
