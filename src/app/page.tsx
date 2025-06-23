import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Brain, Search } from 'lucide-react'

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
        
        {/* Инструменты */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Доступные инструменты
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* AI Mentor */}
            <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Brain className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">AI Mentor</CardTitle>
                </div>
                <p className="text-muted-foreground">
                  Получите инсайт от великих умов в стиле Стива Джобса, Далай-ламы или Эйнштейна
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>✨</span>
                    <span>Персональные советы в стиле легендарных менторов</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>🎯</span>
                    <span>Конкретный план действий за минуту</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>🧠</span>
                    <span>Помощь при выгорании и застое</span>
                  </div>
                </div>
                
                <Button asChild className="w-full group-hover:bg-indigo-600">
                  <Link href="/ai-mentor" className="flex items-center gap-2">
                    Попробовать AI Mentor
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* AI Box Tools */}
            <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Search className="w-6 h-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">AI Tools Directory</CardTitle>
                </div>
                <p className="text-muted-foreground">
                  Каталог AI-инструментов с информацией о доступности из России
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>🔍</span>
                    <span>Поиск и фильтрация по категориям</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>🇷🇺</span>
                    <span>Статус доступности из России</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>📊</span>
                    <span>Детальная информация о каждом инструменте</span>
                  </div>
                </div>
                
                <Button asChild variant="outline" className="w-full group-hover:bg-emerald-50">
                  <Link href="/ai-box-tools" className="flex items-center gap-2">
                    Посмотреть каталог
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* CTA секция */}
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-6">
            Начните с любого инструмента — выберите тот, который решает вашу задачу прямо сейчас
          </p>
        </div>
      </div>
    </div>
  )
}
