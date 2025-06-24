# BIPch.ai Architecture

## Технический стек
- Next.js 15.3.3 - React-фреймворк с SSR и роутингом
- TypeScript - для типизации и улучшения разработки
- Node.js - среда выполнения JavaScript
- Tailwind CSS 4 - утилитарный CSS-фреймворк (последняя версия)
- shadcn/ui - библиотека готовых React-компонентов (тема: slate)
- Radix UI - продвинутые примитивы под капотом shadcn/ui
- Lucide Icons - современная библиотека иконок

## Текущее состояние
- Главная страница с навигацией к инструментам
- Первый инструмент: каталог AI-инструментов (/ai-box-tools)
- **AI-Mentor** - статичная версия интерфейса (/ai-mentor)
- Базовая архитектура для масштабирования

### AI-Mentor - ЗАВЕРШЕН (Этап 1)
**Статус:** Полностью реализован
**URL:** `/ai-mentor`
**Описание:** AI-ментор для предпринимателей с выбором архетипов

**Реализованные функции:**
- 6 менторов (3 активных + 3 coming-soon)
- 3-экранный флоу: выбор → проблема → результат
- Интерактивный интерфейс с переходами
- Мок данные с персонализированными ответами
- Реальные аватары для активных менторов
- Адаптивный дизайн (mobile-first)
- Loading состояния с анимациями
- Error handling с retry функциональностью

**Менторы:**
- **Активные:** Стив Джобс, Далай-лама XIV, Альберт Эйнштейн
- **Coming Soon:** Билл Гейтс, Олег Тиньков, Сергей Галицкий

## Архитектурные паттерны

### Добавление нового инструмента
1. `src/types/[tool].ts` - типы данных
2. `public/data/[tool].json` - данные (≤200 kB)
3. `src/app/[tool]/page.tsx` - страница
4. `src/app/[tool]/layout.tsx` - SEO метаданные
5. Добавить ссылку на главную страницу

### Загрузка данных
- Client-side fetch из JSON файлов
- Обработка состояний: loading, error, success
- При росте данных → переход на RSC/generateStaticParams

### Компонентная архитектура
- Переиспользуемые UI компоненты в `src/components/ui/`
- Кастомные компоненты в `src/components/`
- Строгая типизация всех пропсов
- Адаптивный дизайн через Tailwind CSS

## Структура проекта
```
src/
├── app/
│   ├── page.tsx              # Главная
│   ├── layout.tsx            # Корневой layout
│   ├── globals.css           # Глобальные стили
│   ├── ai-box-tools/         # Каталог AI-инструментов
│   └── ai-mentor/            # AI-ментор
│       ├── page.tsx          # Главная страница
│       ├── layout.tsx        # SEO метаданные
│       ├── components/       # Компоненты ментора
│       │   ├── ChatInterface.tsx    # Управление экранами
│       │   ├── MentorGrid.tsx       # Сетка менторов
│       │   ├── MentorCard.tsx       # Карточка ментора
│       │   ├── ProblemForm.tsx      # Форма проблемы
│       │   └── ResultBlock.tsx      # Результат (4 состояния)
│       └── types/
│           └── mentor.ts     # TypeScript интерфейсы
├── components/
│   ├── ui/                   # shadcn/ui компоненты
│   └── [Custom].tsx          # Кастомные компоненты
├── types/                    # TypeScript интерфейсы
└── lib/                      # Утилиты

public/
├── data/                     # JSON данные инструментов
├── ai-mentor/               # Данные AI-ментора
│   └── data/
│       ├── mentors.json     # 6 менторов
│       └── mock-responses.json  # Ответы менторов
└── images/
    └── mentors/             # Аватары менторов
        ├── steve-jobs.png
        ├── dalai-lama.png
        └── einstein.png
```

## Готовые компоненты
### UI компоненты (shadcn/ui)
- `src/components/ui/card.tsx` - компонент карточки
- `src/components/ui/button.tsx` - компонент кнопки
- `src/components/ui/tabs.tsx` - компонент табов
- `src/components/ui/input.tsx` - компонент ввода
- `src/components/ui/badge.tsx` - компонент бейджа
- `src/components/ui/textarea.tsx` - компонент текстовой области
- `src/components/ui/avatar.tsx` - компонент аватара
- `src/components/ui/collapsible.tsx` - компонент свертывания
- `src/components/ui/checkbox.tsx` - компонент чекбокса
- `src/components/ui/skeleton.tsx` - компонент скелетона
- `src/components/ui/alert.tsx` - компонент уведомлений

### Кастомные компоненты
- `src/components/ToolCard.tsx` - карточка инструмента

## Цветовая схема
Настроена в:
- `tailwind.config.js` - основная конфигурация
- `src/app/globals.css` - CSS переменные
- Базовый цвет: slate (установлен в components.json)

**AI-Mentor цвета:**
```css
Primary: #0F172A (slate-900) - основной текст
Secondary: #334155 (slate-700) - вторичный текст
Accent: #6366F1 (indigo-500) - CTA элементы
Surface: #F8FAFC (slate-50) - фон
Border: #E2E8F0 (slate-200) - границы
Success: #10B981 (emerald-500) - подтверждения
Error: #DC2626 (red-600) - ошибки
```

## Важные файлы
- `src/app/page.tsx` - главная страница
- `src/app/layout.tsx` - корневой layout
- `tailwind.config.js` - конфигурация Tailwind
- `components.json` - конфигурация shadcn/ui

## План разработки
- **Этап 1:** AI-Mentor (статичная версия) - ЗАВЕРШЕН
- **Этап 2:** AI-Mentor (AI API интеграция) - В планах
- **Этап 3:** Дополнительные AI-инструменты

## Процесс деплоя
### Связка: Локальная разработка → GitHub → Vercel → bipch.ru

### Быстрый деплой:
```bash
# ШАГ 1: Убедиться что все работает
npm run build  # ОБЯЗАТЕЛЬНО! Если ошибки - не деплоить!

# ШАГ 2: Сохранить изменения  
git add .
git commit -m "описание изменений"

# ШАГ 3: Если работаешь в feature ветке - мержить в main
git switch main
git pull origin main  
git merge feature/название-ветки

# ШАГ 4: Деплой
git push origin main
# Vercel автоматически задеплоит за 2-3 минуты

# ШАГ 5: Проверить результат
# Открыть bipch.ru через несколько минут
```

**Детальные шаги деплоя:**
1. **Разработка** - `npm run dev` (localhost:3000)
2. **Git commit** - `git add .` → `git commit -m "описание"`
3. **Git push** - `git push origin main`
4. **Автодеплой Vercel** - автоматически собирает из GitHub
5. **Live сайт** - bipch.ru обновляется через 2-3 минуты

**Проверка деплоя:**
- Vercel Dashboard - статус сборки
- bipch.ru - финальный результат

**Важно:** 
- Ветка `main` автоматически деплоится на прод
- Vercel показывает логи сборки при ошибках
- Всегда тестируем локально перед push

### Troubleshooting git workflow:
```bash
# Узнать текущую ветку и статус
git status

# Если в feature ветке - мержить в main:
git switch main
git pull origin main
git merge название-feature-ветки
git push origin main

# Если уже в main - просто пушить:
git push origin main

# Если что-то сломалось - откатиться:
git log --oneline  # посмотреть последние коммиты
git reset --hard HEAD~1  # откатить последний коммит (ОСТОРОЖНО!)
```

## Правила разработки
**Обязательно выполнять при каждом изменении кода:**

### 1. Quality Gate
```bash
npm run build
```
**ЕСЛИ ЕСТЬ ОШИБКИ - НЕ ДЕЛАТЬ PUSH! СНАЧАЛА ИСПРАВИТЬ!**
- `npm run build` + ESLint перед каждым commit
- Все PR проходят через CI проверки
- Строгая типизация TypeScript

### 2. Очистка кеша при странных ошибках:
```bash
rm -rf .next
npm run build
```

### 3. Проверка неиспользуемых импортов:
- Всегда удалять неиспользуемые импорты
- Проверять ESLint warnings
- Не оставлять мертвый код

### 4. Последовательность при изменениях:
1. Внести изменения
2. `npm run build` - проверить сборку
3. Если ошибки - исправить
4. `git add .`
5. `git commit -m "описание"`
6. `git push origin main`

### 5. При ошибках деплоя на Vercel:
- Читать логи внимательно
- Искать ESLint/TypeScript ошибки
- Проверять импорты
- Делать hotfix commit сразу

## Безопасность и конфигурация

### Secrets & Environment
- Секреты только в Vercel Environment Variables
- Не коммитить API ключи
- Валидация URL и данных из JSON

### Мониторинг
- Ошибки отслеживаем через Vercel Dashboard
- Критичные баги → hotfix в main

## Git Workflow

### Правило: НЕ РАБОТАТЬ НАПРЯМУЮ В MAIN!

### Workflow для новых фичей:
```bash
# 1. Переключиться на main и обновить
git switch main
git pull origin main

# 2. Создать новую ветку для фичи
git switch -c feature/название-фичи

# 3. Работать в новой ветке
npm run build  # проверяем!
git add .
git commit -m "Добавил новую фичу"

# 4. Отправить ветку в GitHub
git push origin feature/название-фичи

# 5. MERGE ЛОКАЛЬНО (рекомендуемый способ):
git switch main
git pull origin main
git merge feature/название-фичи
git push origin main
# Vercel автоматически задеплоит через 2-3 минуты

# 6. Альтернатива - через GitHub UI (если нужен код-ревью):
# - Создать Pull Request в GitHub интерфейсе
# - После проверки - сделать merge в main
```

### Исключения для main:
- Hotfix критических ошибок
- Мелкие правки документации
- Обновления зависимостей

**ЭТИ ПРАВИЛА КРИТИЧНЫ ДЛЯ СТАБИЛЬНОСТИ ПРОЕКТА!**

## Заметки по разработке
- Используется App Router (не Pages Router)
- Страницы находятся в `src/app`
- TypeScript настроен для безопасной разработки
- Адаптивный дизайн с помощью Tailwind CSS

## Известные проблемы и решения

### Webpack Module Errors
**Проблема:** Ошибки `Cannot find module './447.js'` в dev режиме
**Решение:** 
```bash
rm -rf .next
rm -rf node_modules/.cache
npm run build
```

**Статус:** Билды всегда проходят успешно, проблемы только в dev server