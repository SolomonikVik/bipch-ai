import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Mentor | BIPch.ai - Получите инсайт от великих умов',
  description: 'AI-ментор для предпринимателей. Получите совет в стиле Стива Джобса, Далай-ламы или Эйнштейна. Опишите проблему и получите инсайт + план действий.',
  keywords: 'AI ментор, бизнес консультант, Стив Джобс, предпринимательство, бизнес советы, искусственный интеллект',
  openGraph: {
    title: 'AI Mentor - Получите инсайт от великих умов',
    description: 'Опишите свою бизнес-проблему и получите совет в стиле легендарных предпринимателей и мыслителей',
    type: 'website',
    url: 'https://bipch.ru/ai-mentor'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Mentor - Получите инсайт от великих умов',
    description: 'Опишите свою бизнес-проблему и получите совет в стиле легендарных предпринимателей и мыслителей'
  }
}

export default function AIMentorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
} 