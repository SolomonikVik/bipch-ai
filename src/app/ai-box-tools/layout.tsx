import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI-инструменты для руководителя | BIPch.ai',
  description: 'Проверенная коллекция AI-решений для руководителей и предпринимателей с информацией о доступности из России',
}

export default function AIBoxToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 