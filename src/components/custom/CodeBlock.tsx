export default function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="my-4 overflow-scroll rounded bg-slate-100">
      <code className="text-slate-800">{children}</code>
    </pre>
  );
}
