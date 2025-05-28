import { ToolCard } from "@/components/ToolCard"
import { Target, Video, Users } from "lucide-react"

export default function Home() {
  const tools = [
    {
      icon: Target,
      title: "Сформулировать цель",
      description: "Преврати размытую идею в чёткую цель с помощью AI-ассистента"
    },
    {
      icon: Video,
      title: "Извлечь пользу из видео",
      description: "Получи ключевые инсайты и конспект из любого видео или подкаста"
    },
    {
      icon: Users,
      title: "Провести утреннюю планёрку",
      description: "Эффективно организуй командную работу с помощью AI-фасилитатора"
    }
  ]

  return (
    <main className="container mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          bipch — AI-инструменты для предпринимателей
        </h1>
        <p className="text-xl text-muted-foreground">
          Платформа с практическими AI-инструментами для целей, команд и решений
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </main>
  )
}
