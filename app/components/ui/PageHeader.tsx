type PageHeaderProps = {
  label?: string;
  title: string;
  description?: string;
};

export default function PageHeader({
  label,
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="mb-6">
      {label && (
        <p className="text-sm font-semibold uppercase tracking-wide text-violet-400">
          {label}
        </p>
      )}

      <h1 className="mt-2 text-3xl font-bold text-white">{title}</h1>

      {description && (
        <p className="mt-3 max-w-2xl text-slate-400">{description}</p>
      )}
    </header>
  );
}