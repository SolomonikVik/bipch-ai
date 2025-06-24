import { MentorPrompt, PromptsConfig } from './types'

// Кешированные промпты
let cachedPrompts: PromptsConfig | null = null

// Функция для загрузки промптов из JSON
async function loadPrompts(): Promise<PromptsConfig> {
  if (cachedPrompts) {
    return cachedPrompts
  }

  try {
    // В серверной среде загружаем файл напрямую
    if (typeof window === 'undefined') {
      const fs = await import('fs').then(m => m.promises)
      const path = await import('path')
      
      const promptsPath = path.join(process.cwd(), 'src/app/ai-mentor/prompts/mentors.json')
      const fileContent = await fs.readFile(promptsPath, 'utf-8')
      cachedPrompts = JSON.parse(fileContent)
    } else {
      // В клиентской среде делаем fetch (если понадобится)
      const response = await fetch('/api/ai-mentor/prompts')
      cachedPrompts = await response.json()
    }

    return cachedPrompts || {}
  } catch (error) {
    console.error('Error loading mentor prompts:', error)
    return {}
  }
}

// Основная функция для получения промпта ментора
export async function getMentorPrompt(mentorId: string): Promise<MentorPrompt | null> {
  const prompts = await loadPrompts()
  return prompts[mentorId] || null
}

// Синхронная версия для использования в Server Actions (когда промпты уже загружены)
export function getMentorPromptSync(mentorId: string): MentorPrompt | null {
  if (!cachedPrompts) {
    console.error('Prompts not loaded. Call loadPrompts() first.')
    return null
  }
  return cachedPrompts[mentorId] || null
}

// Функция для предзагрузки промптов при старте сервера
export async function preloadPrompts(): Promise<void> {
  await loadPrompts()
}

// Получить список доступных менторов
export function getAvailableMentors(): string[] {
  if (!cachedPrompts) return []
  return Object.keys(cachedPrompts)
}

// Промпт Эйнштейна (адаптированная одноэтапная версия)
const EINSTEIN_PROMPT: MentorPrompt = {
  system: `Ты — AI-ментор в образе Альберта Эйнштейна, помогающий предпринимателям выйти из тупика через смену системы мышления.

Твой метод:
- Мысленные эксперименты и физические аналогии
- Поиск скрытых допущений
- Парадоксальное мышление с легкой иронией
- Упрощение сложного до элегантного

Миссия: За 1 минуту дать инсайт, меняющий точку зрения, и чек-лист из 3-5 конкретных действий.

Алгоритм работы:
1. Проанализируй проблему через призму физики
2. Выяви главное скрытое допущение
3. Создай "формулу проблемы" 
4. Проведи мысленный эксперимент
5. Найди парадокс или контринтуитивное решение
6. Дай конкретный план действий с метриками

Отвечай ТОЛЬКО в JSON формате:
{
  "insight": "Твой главный инсайт с физической аналогией и парадоксом",
  "checklist": [
    "День 1: Конкретное действие с метрикой",
    "День 2-3: Следующий шаг с ожидаемым результатом", 
    "Неделя 1: Измерить прогресс",
    "Контринтуитивный ход: антисовет или провокация",
    "Следующий эксперимент для проверки гипотезы"
  ]
}

Фирменные фразы: "Воображение важнее знаний", "Нельзя решить проблему тем же мышлением, которое её создало", "В середине трудности лежит возможность".`,
  user_template: "Профессор Эйнштейн, передо мной сложная задача:\n\n{problem}\n\nПомогите применить научное мышление и найти элегантное решение через смену точки зрения.",
  response_format: "json_object"
}

// Функция для получения промпта с fallback на временные промпты
export function getMentorPromptWithFallback(mentorId: string): MentorPrompt | null {
  // Если есть кешированные промпты, используем их
  if (cachedPrompts && cachedPrompts[mentorId]) {
    return cachedPrompts[mentorId]
  }

  // Временные промпты для тестирования
  if (mentorId === 'einstein') {
    return EINSTEIN_PROMPT
  }

  return null
} 