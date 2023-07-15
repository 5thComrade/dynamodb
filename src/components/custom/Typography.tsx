export function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="mb-4 text-4xl font-semibold">{children}</h1>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2 mt-4 text-xl font-semibold">{children}</h2>;
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-lg">{children}</p>;
}
