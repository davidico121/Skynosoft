export function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-label text-label-mono uppercase tracking-wide text-primary-soft">
      {children}
    </span>
  );
}
