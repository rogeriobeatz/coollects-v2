import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Coollects - Catalogar suas Coleções',
  description: 'Aplicativo para colecionadores catalogarem e compartilharem suas coleções',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/ios/180.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}
