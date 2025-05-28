import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface ToolCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function ToolCard({ icon: Icon, title, description }: ToolCardProps) {
  return (
    <Card className="flex flex-col transition-all duration-200 hover:bg-accent hover:shadow-lg cursor-pointer group">
      <CardHeader>
        <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full transition-colors"
          variant="secondary"
          size="lg"
        >
          Запустить
        </Button>
      </CardFooter>
    </Card>
  )
} 