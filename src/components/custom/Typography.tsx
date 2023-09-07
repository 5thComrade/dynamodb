export function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`mb-4 mt-3 text-4xl font-semibold ${className}`}>
      {children}
    </h1>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`mb-2 mt-4 text-xl font-semibold ${className}`}>
      {children}
    </h2>
  );
}

export function Paragraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-lg ${className}`}>{children}</p>;
}
