# ai-bipch-mentor архитектура   
### Проект: AI-ментор для предпринимателей   
**Этап 1:** Статичная версия интерфейса (без API)   
### Контекст задачи:   
Создаем инструмент, где предприниматель выбирает AI-ментора (Стив Джобс, Далай-лама, Эйнштейн), описывает свою проблему и получает инсайт + план действий. На первом этапе делаем только интерфейс без подключения к AI.   
### Технический стек:   
- Next.js 15.3.3   
- TypeScript   
- Tailwind CSS 4   
- shadcn/ui (тема slate)   
- Lucide Icons   
   
### Что нужно создать:   
### 1. Структура файлов:   
```
src/app/ai-mentor/
├── page.tsx                 # Главная страница
├── components/
│   ├── MentorGrid.tsx      # Сетка менторов
│   ├── MentorCard.tsx      # Карточка ментора
│   ├── ChatInterface.tsx   # Управление экранами
│   ├── ProblemForm.tsx     # Форма проблемы
│   └── ResultBlock.tsx     # Результат (4 состояния)
├── types/
│   └── mentor.ts           # TypeScript типы
└── data/
    └── mentors.json        # Данные менторов

```
### 2. TypeScript интерфейсы (types/mentor.ts):   
```typescript
interface Mentor {
  id: string;
  name: string;
  status: 'active' | 'coming-soon';
  avatar: string;
  tagline: string;
  focus?: string;
  triggers?: string[];
  style?: string;
  description?: string;
}

type ResultState = 'idle' | 'loading' | 'success' | 'error';

interface MentorResult {
  state: ResultState;
  insight?: string;
  checklist?: string[];
  error?: string;
}
```
### 3. Данные менторов (data/mentors.json):   
```json
{
  "mentors": [
    {
      "id": "steve-jobs",
      "name": "Стив Джобс",
      "status": "active",
      "avatar": "/images/mentors/steve-jobs.jpg",
      "tagline": "Think Different",
      "focus": "Инновации и эмоциональный продукт",
      "triggers": ["продукт не выделяется", "конкуренты обгоняют", "застой идей"],
      "style": "Провокационные вопросы, радикальный фокус",
      "description": "Поможет найти уникальность продукта и отсечь лишнее"
    },
    {
      "id": "dalai-lama",
      "name": "Далай-лама XIV",
      "status": "active",
      "avatar": "/images/mentors/dalai-lama.jpg",
      "tagline": "Внутренний баланс",
      "focus": "Смысл и энергия лидера",
      "triggers": ["выгорание", "потеря мотивации", "зачем всё это?"],
      "style": "Рефлективные вопросы, осознанность",
      "description": "Поможет найти внутреннюю опору и смысл"
    },
    {
      "id": "einstein",
      "name": "Альберт Эйнштейн",
      "status": "active",
      "avatar": "/images/mentors/einstein.jpg",
      "tagline": "Переопредели проблему",
      "focus": "Латеральное мышление",
      "triggers": ["все решения перепробованы", "сложная задача", "нужен прорыв"],
      "style": "Парадоксы и смена системы координат",
      "description": "Поможет взглянуть на проблему под новым углом"
    },
    {
      "id": "bill-gates",
      "name": "Билл Гейтс",
      "status": "coming-soon",
      "avatar": "/images/mentors/bill-gates.jpg",
      "tagline": "Данные + Стратегия"
    }
  ]
}
```
### 4. Цветовая схема:   
```css
Primary: #0F172A (slate-900) - основной текст
Secondary: #334155 (slate-700) - вторичный текст
Accent: #6366F1 (indigo-500) - CTA элементы
Surface: #F8FAFC (slate-50) - фон
Border: #E2E8F0 (slate-200) - границы
Success: #10B981 (emerald-500) - подтверждения
Error: #DC2626 (red-600) - ошибки
```
### 5. User Flow (3 экрана):   
1. **Выбор ментора** → 2. **Описание проблемы** → 3. **Результат**   
   
### 6. Важные требования:   
### Performance Budget:   
- Lighthouse Score ≥ 85   
- LCP < 2.5s (главный контент)   
- TBT < 200ms (блокировка)   
- Оптимизировать изображения аватаров   
   
### Упрощения для MVP:   
- ❌ НЕ делать typing effect   
- ❌ НЕ делать сложные анимации   
- ✅ Только простые CSS transitions   
- ✅ Fade эффекты для появления   
   
### Компоненты shadcn/ui:   
Использовать готовые компоненты:   
- Card, Button, Textarea, Avatar   
- Collapsible, Checkbox, Badge   
- Skeleton, Separator, Alert   
- Loader2 (для спиннера)   
   
### 7. Детали реализации:   
### ResultBlock - 4 состояния:   
1. **idle** - пустой/скрытый блок   
2. **loading** - спиннер + текст "Ментор думает..."   
3. **success** - инсайт + чек-лист (мок данные)   
4. **error** - сообщение об ошибке + кнопка retry   
   
### Мок данные для демо:   
При нажатии "Получить инсайт":   
- Показать loading на 2 секунды   
- Затем показать заготовленный ответ   
- Для разных менторов - разные мок ответы   
   
### Аватары:   
Пока использовать цветные placeholder с инициалами:   
- СД для Стива Джобса (фиолетовый фон)   
- ДЛ для Далай-ламы (оранжевый фон)   
- АЭ для Эйнштейна (синий фон)   
   
### 8. Критерии готовности:   
- [ ] `npm run build` проходит без ошибок   
- [ ] Все 3 экрана работают   
- [ ] Переходы между экранами плавные   
- [ ] Mobile версия адаптивная   
- [ ] ResultBlock показывает все 4 состояния   
### 9. Приоритеты разработки:   
1. Сначала desktop версия   
2. Базовый функционал всех экранов   
3. Затем mobile адаптация   
4. В конце - полировка анимаций   
   
### Файлы с дизайном:   
В следующем сообщении будет детальный дизайн всех экранов и компонентов от AI-дизайнера.   
**Начинай с создания базовой структуры и постепенно добавляй компоненты!** 