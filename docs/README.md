# BIPch.ai - AI-инструменты для руководителей

## 🎯 Проект
Веб-платформа каталога AI-инструментов для руководителей. Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui.

## 🏗️ Архитектура
- **Frontend:** Next.js 15.3.3 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui
- **Данные:** JSON файлы в `/public/data/` (≤200 kB)
- **Деплой:** Vercel → GitHub → bipch.ru
- **Структура:** Один инструмент = JSON + страница + типы

## 📁 Ключевые папки
```
src/
├── app/                    # Next.js страницы
├── components/             # React компоненты
│   ├── ui/                # shadcn/ui компоненты
│   └── ToolCard.tsx       # Карточка инструмента
├── types/                 # TypeScript типы
└── lib/                   # Утилиты

public/
└── data/                  # JSON данные инструментов
```

## ➕ Добавление инструмента
1. `src/types/[tool].ts` - типы
2. `public/data/[tool].json` - данные
3. `src/app/[tool]/page.tsx` - страница
4. `src/app/[tool]/layout.tsx` - SEO
5. Добавить ссылку на главную

## 🔧 Команды
```bash
npm run dev          # Разработка
npm run build        # Сборка
npm run lint         # Проверка кода
```

## 🚨 КРИТИЧЕСКИЕ ПРАВИЛА ДЛЯ AI
**ОБЯЗАТЕЛЬНО ВЫПОЛНЯТЬ ПРИ КАЖДОМ ИЗМЕНЕНИИ:**

### Quality Gate
```bash
npm run build
```
**ЕСЛИ ЕСТЬ ОШИБКИ - НЕ ДЕЛАТЬ PUSH! СНАЧАЛА ИСПРАВИТЬ!**

### Последовательность изменений:
1. Внести изменения
2. `npm run build` ✅
3. Если ошибки - исправить
4. `git add .`
5. `git commit -m "описание"`
6. `git push origin main`

### При ошибках:
```bash
# Очистка кеша
rm -rf .next
npm run build

# Проверка импортов
npm run lint
```

## 🌿 Git Workflow
**ПРАВИЛО: НЕ РАБОТАТЬ НАПРЯМУЮ В MAIN!**

### Для новых фичей:
```bash
git switch main
git pull origin main
git switch -c feature/название-фичи
# работаем в ветке
git push origin feature/название-фичи
# создаем Pull Request
```

### Исключения для main:
- Hotfix критических ошибок
- Мелкие правки документации

## 📊 Текущее состояние
✅ Главная страница с навигацией
✅ Каталог AI-инструментов (/ai-box-tools)
✅ Базовая архитектура готова к масштабированию

## 🎨 Дизайн
- **Тема:** Slate (серо-синяя)
- **Компоненты:** shadcn/ui + кастомные
- **Адаптивность:** Mobile-first подход
- **Иконки:** Lucide Icons 

## 📚 Документация
- **[Дизайн](./design/README.md)** - дизайн-система и компоненты
- **[Инструменты](./tools/)** - документация по инструментам
  - [AI Mentor](./tools/ai-mentor/) - персональный AI-наставник
- **[Архитектура](../ARCHITECTURE.md)** - подробная архитектурная документация 