'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Grid, Brain, Image, Music, Video, Code, Package, Home } from 'lucide-react'
import ToolCard from '@/components/ToolCard'
import { AITool, CATEGORIES } from '@/types/ai-tools'

export default function AIBoxToolsPage() {
  const [tools, setTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Загрузка данных
  useEffect(() => {
    const loadTools = async () => {
      try {
        const response = await fetch('/data/ai-box-tools.json')
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные')
        }
        const data = await response.json()
        setTools(data.tools || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки данных')
      } finally {
        setLoading(false)
      }
    }

    loadTools()
  }, [])

  // Фильтрация инструментов
  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Получение иконки категории
  const getCategoryIcon = (iconName: string) => {
    const icons = {
      Grid, Brain, Image, Music, Video, Code, Package
    }
    const IconComponent = icons[iconName as keyof typeof icons] || Grid
    return <IconComponent className="w-4 h-4" />
  }

  const NavigationHeader = () => (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-lg">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Главная</span>
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-700 font-medium">AI Tools Directory</span>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-red-600">Ошибка: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            AI-инструменты для руководителя
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Проверенная коллекция AI-решений с информацией о доступности из России
          </p>
        </div>

        {/* Фильтры и поиск */}
        <div className="mb-8 space-y-6">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 h-auto">
              {CATEGORIES.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2 text-xs md:text-sm px-3 py-2"
                >
                  {getCategoryIcon(category.icon)}
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Поиск по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Найдено инструментов: {filteredTools.length}
          </div>
        </div>

        {/* Сетка инструментов */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-16">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Инструменты не найдены</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить категорию или поисковый запрос
            </p>
          </div>
        )}

        {/* Блок обратной связи */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-semibold mb-2">
              Не нашли нужный инструмент?
            </h3>
            <p className="text-muted-foreground mb-4">
              Напишите нам, и мы добавим его в коллекцию
            </p>
            <div className="text-primary font-medium">
              📧 contact@bipch.ru
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 