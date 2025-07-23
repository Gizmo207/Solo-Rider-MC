import './globals.css';

export const metadata = {
  title: 'SoloRidersMC',
  description: 'Scroll Journey Experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
