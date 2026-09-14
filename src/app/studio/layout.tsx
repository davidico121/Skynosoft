export const metadata = {
  title: "Skynosoft Studio",
  description: "Content editor for the Skynosoft website.",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, height: "100vh" }}>{children}</body>
    </html>
  );
}
