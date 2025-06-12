import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { AITool } from "@/types/ai-tools"

interface ToolCardProps {
  tool: AITool
}

const getCategoryColor = (category: string) => {
  const colors = {
    llm: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    image: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    audio: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    video: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    code: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    other: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300'
  }
  return colors[category as keyof typeof colors] || colors.other
}

const getAccessIndicator = (access: string) => {
  const indicators = {
    open: { text: '🟢 Без VPN', color: 'text-green-600' },
    vpn: { text: '🟡 Нужен VPN', color: 'text-yellow-600' },
    blocked: { text: '🔴 Заблокирован', color: 'text-red-600' }
  }
  return indicators[access as keyof typeof indicators] || indicators.open
}

const getPricingDisplay = (pricing: string, priceFrom?: string) => {
  switch (pricing) {
    case 'free':
      return { text: 'Бесплатно', color: 'text-green-600' }
    case 'freemium':
      return { 
        text: priceFrom ? `Условно-бесплатно • ${priceFrom}` : 'Условно-бесплатно', 
        color: 'text-blue-600' 
      }
    case 'paid':
      return { text: priceFrom || 'Платно', color: 'text-orange-600' }
    default:
      return { text: 'Не указано', color: 'text-gray-600' }
  }
}

const getCategoryDisplayName = (category: string) => {
  const names = {
    llm: 'Языковые модели',
    image: 'Изображения', 
    audio: 'Аудио',
    video: 'Видео',
    code: 'Код',
    other: 'Другое'
  }
  return names[category as keyof typeof names] || 'Другое'
}

export default function ToolCard({ tool }: ToolCardProps) {
  const accessInfo = getAccessIndicator(tool.access)
  const pricingInfo = getPricingDisplay(tool.pricing, tool.priceFrom)

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {tool.logo ? (
                <span className="text-2xl">{tool.logo}</span>
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {tool.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg leading-tight">
                {tool.name}
              </h3>
              {tool.featured && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  ⭐ Выбор редакции
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={getCategoryColor(tool.category)}>
            {getCategoryDisplayName(tool.category)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-3">
        <div className="space-y-2 text-sm">
          <div className={accessInfo.color}>
            {accessInfo.text}
          </div>
          <div className={pricingInfo.color}>
            {pricingInfo.text}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
          {tool.description}
        </p>
        
        <Button 
          variant="outline" 
          className="w-full mt-auto"
          asChild
        >
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            Перейти
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
} 