export default function AuthHeader({
  title,
  subtitle,
}: Readonly<{ title: string; subtitle: string }>) {
  return (
    <header>
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <p className="text-primary mt-2">{subtitle}</p>
    </header>
  );
}
