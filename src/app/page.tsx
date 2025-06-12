import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            AI-инструменты для Руководителя
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Платформа с практическими AI-решениями для управления командой, 
            принятия решений и достижения бизнес-целей
          </p>
        </div>
        
        <div className="text-center space-y-6">
          <p className="text-muted-foreground text-lg">
            Откройте для себя проверенную коллекцию AI-инструментов с информацией о доступности из России
          </p>
          
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/ai-box-tools" className="flex items-center gap-2">
              Посмотреть AI-инструменты
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
