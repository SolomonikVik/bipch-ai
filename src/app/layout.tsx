import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'AI-инструменты для Руководителя | BIPch.ai',
  description: 'Платформа с практическими AI-решениями для управления командой, принятия решений и достижения бизнес-целей',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
