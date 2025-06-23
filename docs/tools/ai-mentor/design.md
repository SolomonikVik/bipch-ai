# ai-bipch-mentor дизайн   
## 1. Общая концепция   
**Mood & Feeling:** Премиум AI-инструмент с философским подходом. Сочетание технологичности и мудрости. Чистота и глубина вместо яркости и суеты. Интерфейс как "тихое место для размышлений" в цифровом мире.   
**Принципы:**   
- Дышащие пространства и минимализм   
- Subtle градиенты вместо плоских цветов   
- Типографика как главный визуальный элемент   
- Деликатные тени и переходы   
- Каждый элемент служит цели   
   
## 2. Цветовые палитра    
### Вариант: "Технологичная мудрость"   
```
Primary: #0F172A (slate-900) - основной текст
Secondary: #334155 (slate-700) - вторичный текст
Accent: #6366F1 (indigo-500) - CTA, активные элементы
Surface: #F8FAFC (slate-50) - фон
Border: #E2E8F0 (slate-200) - границы
Success: #10B981 (emerald-500) - подтверждения
```
## 3. Типографика   
**Основной шрифт:** Inter (system font fallback)   
- **Заголовки H1:** 32px/40px, font-weight: 600 (semibold)   
- **Заголовки H2:** 24px/32px, font-weight: 600   
- **Заголовки H3:** 20px/28px, font-weight: 500 (medium)   
- **Body Large:** 16px/24px, font-weight: 400   
- **Body:** 14px/20px, font-weight: 400   
- **Small:** 12px/16px, font-weight: 400   
   
**Акцентный шрифт:** JetBrains Mono для кода/технических элементов   
## 4. Детальное описание экранов   
### Экран 1: Выбор ментора   
**Desktop Layout:**   
```
Header (80px высота):
├── Logo area (слева) - текст "AI Mentor"
├── Navigation (центр) - пустая зона
└── User menu (справа) - аватар placeholder

Hero Section (400px):
├── Centered content, max-width: 640px
├── H1: "Получите инсайт от великих умов"
├── Subtitle: "Опишите свою проблему и получите совет в стиле легендарных предпринимателей и мыслителей"
└── 16px margin между элементами

Mentors Grid (auto height):
├── Container: max-width 1024px, centered
├── Grid: 3 колонки на desktop, gap: 24px
└── Padding: 48px vertical, 24px horizontal
```
**Карточка ментора (320x240px):**   
```
Card (shadcn/ui):
├── Header (80px):
│   ├── Avatar (64x64px) - левый верхний угол
│   ├── Name (H3) - справа от аватара
│   └── Tagline (body small, muted) - под именем
├── Content (120px):
│   ├── Описание фокуса (body, 2-3 строки)
│   └── "Для тех кто:" (small text, slate-600)
└── Footer (40px):
    └── Button: "Выбрать" (full width, variant: outline)
```
**Состояния карточки:**   
- Default: border slate-200, shadow-sm   
- Hover: border accent, shadow-md, transform: translateY(-2px)   
- Selected: border accent, background: accent/5   
   
### Экран 2: Описание проблемы   
**Layout:**   
```
Header: тот же

Selected Mentor Bar (120px):
├── Container: full width, background: slate-50
├── Content: max-width 768px, centered
├── Mentor mini-card (горизонтальная):
│   ├── Avatar (48px)
│   ├── Name + tagline (vertical stack)
│   └── Change button (ghost variant)
└── Padding: 24px vertical

Problem Form (auto height):
├── Container: max-width 640px, centered
├── H2: "Опишите вашу ситуацию"
├── Textarea (shadcn/ui):
│   ├── Placeholder: "Расскажите подробно о проблеме..."
│   ├── Min-height: 200px
│   └── Character counter: "0/1000"
├── Helper tips (Collapsible):
│   ├── Trigger: "Что описать для лучшего результата?"
│   └── Content: список подсказок
└── Submit Button: "Получить инсайт" (full width, primary)
```
**Подсказки (expandable):**   
```
Card with muted background:
├── "📝 Контекст бизнеса"
├── "🎯 Конкретная проблема"
├── "💡 Что уже пробовали"
└── "⚡ Желаемый результат"
```
### Экран 3: Результат   
**Layout:**   
```
Header: тот же

Mentor Response (auto height):
├── Container: max-width 768px, centered
├── Mentor header:
│   ├── Avatar (48px) + name
│   └── Response indicator: "отвечает..."
├── Insight Block:
│   ├── Quote mark icon (large, accent color)
│   ├── Response text (styled как quote)
│   └── Signature line "— Steve Jobs"
└── Animations: typing effect для текста

Action Plan (auto height):
├── H3: "Ваш план действий"
├── Checklist (shadcn/ui):
│   ├── Each item: Checkbox + action text
│   ├── 3-5 конкретных пунктов
│   └── Возможность отмечать выполненное
└── Progress indicator: "0 из 5 выполнено"

Bottom Actions (80px fixed):
├── Primary: "Запомнить план" (coming soon badge)
├── Secondary: "Новый вопрос"
└── Share: ghost button with icon
```
## 5. Микроанимации и переходы   
### Глобальные переходы:   
```
/* Базовые transition */
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)

/* Hover states */
transform: translateY(-2px)
transition: transform 0.2s ease

/* Page transitions */
fade + slide up: 0.3s ease-out
```
### Специфические анимации:   
**Выбор ментора:**   
- Карточки появляются с stagger delay (100ms между карточками)   
- Hover: subtle lift + shadow increase   
- Selection: smooth border color change + background fade   
   
**Форма проблемы:**   
- Textarea auto-resize с smooth transition   
- Character counter color change: gray → accent → warning   
- Submit button: loading spinner + text change   
   
**Результат:**   
- Typing effect для ответа ментора (40ms per character)   
- Checklist items появляются по одному (200ms delay)   
- Checkbox animations при отметке выполнения   
   
### Loading состояния:   
```
Button loading:
├── Spinner (16px) + "Генерируем ответ..."
├── Disabled state с opacity: 0.6
└── Pulse animation на тексте

Page loading:
├── Skeleton states для всех компонентов
├── Shimmer effect на карточках
└── Progressive loading контента
```
### Responsive поведение:   
```
Mobile adjustments:
├── Grid: 1 колонка для менторов
├── Padding: 16px вместо 24px
├── Карточки: full width с оптимизированной высотой
├── Typography scale: -2px для всех размеров
└── Touch targets: минимум 44px
```
**Компоненты shadcn/ui для использования:**   
- Card, Button, Textarea, Avatar   
- Collapsible, Checkbox, Badge   
- Skeleton, Separator, Dialog (для будущих фич)   
   
Концепция готова к реализации с фокусом на пользовательский опыт и техническую элегантность в духе современных AI-продуктов.   
   
## ResultBlock - Дополнительные состояния   
### 1. Idle State (начальное)   
```
Container: max-width 768px, centered
├── Empty state illustration placeholder
├── Subtle hint text: "Ответ ментора появится здесь"
├── Height: 0 (collapsed), transition к full height
└── Visibility: hidden до момента отправки
```
### 2. Loading State (процесс генерации)   
**Визуальная структура:**   
```
Loading Container (400px min-height):
├── Mentor Context Bar:
│   ├── Avatar (48px) + selected mentor name
│   ├── Status indicator: "думает..." (pulsing dot)
│   └── Background: slate-50, border-left: 4px solid accent
├── Thinking Process (240px):
│   ├── Center-aligned content
│   ├── Large spinner (32px) - accent color
│   ├── Primary text: "Ментор анализирует вашу ситуацию"
│   ├── Secondary text: "Это может занять 15-30 секунд"
│   └── Progress hints (опционально)
└── Skeleton Placeholder:
    ├── Response area outline (subtle)
    ├── Action plan skeleton (3-4 lines)
    └── Shimmer animation overlay
```
**Детализация компонентов:**   
**Статус индикатор:**   
```
Pulsing dot:
├── Size: 8px circle
├── Color: #6366F1 (accent)
├── Animation: pulse 1.5s infinite
├── Position: рядом с текстом "думает..."
└── Box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2)
```
**Спиннер (shadcn/ui):**   
```
<div className="flex items-center justify-center py-12">
  <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
</div>
```
**Прогресс подсказки (появляются по очереди):**   
```
Hint sequence (fade in/out каждые 3-4 сек):
├── "Изучаю контекст проблемы..."
├── "Применяю подход [Mentor Name]..."
├── "Формирую персональные рекомендации..."
└── "Финализирую план действий..."
```
**Skeleton структура:**   
```
Response Skeleton:
├── Header line: width 60%, height 20px
├── Text lines: 3 строки, width: 100%, 80%, 90%
├── Quote area: rounded border, height 120px
└── Action items: 4 строки с checkbox placeholders

Colors:
├── Background: #F1F5F9 (slate-100)
├── Shimmer: linear-gradient с белым
└── Animation: shimmer 2s infinite
```
### 3. Error State (ошибка генерации)   
**Цветовая схема для ошибок:**   
```
Error colors (дополнение к Варианту A):
├── Error: #DC2626 (red-600) - основной error цвет
├── Error light: #FECACA (red-200) - фон error блока
├── Error border: #F87171 (red-400) - границы
└── Error muted: #991B1B (red-800) - темный текст
```
**Визуальная структура:**   
```
Error Container (320px min-height):
├── Error Alert (shadcn/ui Alert):
│   ├── Variant: destructive
│   ├── Icon: AlertTriangle (24px, error color)
│   ├── Title: "Не удалось получить ответ"
│   └── Description: пользовательский текст ошибки
├── Error Details (collapsible):
│   ├── Trigger: "Что произошло?" (subtle link)
│   └── Content: техническая информация
├── Actions Section:
│   ├── Primary: "Попробовать снова" (full width)
│   ├── Secondary: "Изменить вопрос" (outline)
│   └── Helper: "Связаться с поддержкой" (ghost)
└── Recovery Suggestions:
    ├── "Проверьте интернет-соединение"
    ├── "Попробуйте переформулировать вопрос"
    └── "Обновите страницу"
```
**Error Alert детализация:**   
```
<Alert variant="destructive" className="mb-6">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Не удалось получить ответ</AlertTitle>
  <AlertDescription>
    Произошла ошибка при генерации ответа. Попробуйте еще раз
    или переформулируйте ваш вопрос.
  </AlertDescription>
</Alert>
```
**Типы ошибок и тексты:**   
**Сетевая ошибка:**   
```
Title: "Проблема с соединением"
Description: "Проверьте интернет-соединение и попробуйте снова"
Suggestion: "Убедитесь, что у вас стабильное подключение к интернету"
```
**Ошибка AI сервиса:**   
```
Title: "Ментор временно недоступен"
Description: "Сервис перегружен. Попробуйте через несколько минут"
Suggestion: "Попробуйте выбрать другого ментора или подождите немного"
```
**Ошибка валидации:**   
```
Title: "Недостаточно информации"
Description: "Опишите вашу проблему подробнее для качественного ответа"
Suggestion: "Добавьте больше контекста о вашей ситуации"
```
**Кнопки восстановления:**   
```
Primary Button:
├── Text: "Попробовать снова"
├── Variant: default (accent color)
├── Loading state: "Пробуем снова..."
├── Icon: RotateCcw
└── Full width на mobile

Secondary Button:
├── Text: "Изменить вопрос"
├── Variant: outline
├── Action: возврат к форме с сохранением текста
└── Icon: Edit

Ghost Button:
├── Text: "Связаться с поддержкой"
├── Variant: ghost
├── Size: sm
└── External link behavior
```
### 4. Анимации переходов между состояниями   
**idle → loading:**   
```
Transition:
├── Height: auto expand (0.3s ease-out)
├── Opacity: 0 → 1 (0.2s ease-in)
├── Transform: translateY(20px) → translateY(0)
└── Stagger: элементы появляются по очереди
```
**loading → success:**   
```
Transition:
├── Skeleton fade out (0.2s)
├── Content fade in (0.4s ease-out)
├── Typing animation для текста ответа
└── Action items: stagger появление (100ms delay)
```
**loading → error:**   
```
Transition:
├── Spinner scale down + fade out (0.2s)
├── Error alert slide down (0.3s ease-out)
├── Shake animation для привлечения внимания
└── Action buttons: stagger появление
```
**error → loading (retry):**   
```
Transition:
├── Error content fade out (0.2s)
├── Loading spinner fade in (0.3s)
├── Smooth height adjustment
└── Reset scroll position если нужно
```
### 5. Дополнительные UX элементы   
**Прогресс индикатор (опционально):**   
```
<Progress value={progress} className="w-full h-2 mb-4" />
// Анимированный от 0 до 90% во время loading
```
**Toast уведомления:**   
```
Success: "Ответ получен!"
Error: "Что-то пошло не так"
Retry: "Повторная попытка..."
```
**Accessibility:**   
```
Loading state:
├── aria-live="polite" для статус апдейтов
├── Четкие labels для screen readers
└── Focus management при переходах

Error state:
├── aria-describedby для error описания
├── Role="alert" для критичных ошибок
└── Keyboard navigation для всех actions
```
Все состояния используют единую типографику и spacing из основной дизайн-системы, обеспечивая консистентность UX через весь флоу. 