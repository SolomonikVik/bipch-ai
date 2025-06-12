export interface AITool {
  id: string;
  name: string;
  category: 'llm' | 'image' | 'audio' | 'video' | 'code' | 'other';
  url: string;
  description: string; // максимум 100 символов
  logo?: string; // эмодзи или буква
  access: 'open' | 'vpn' | 'blocked';
  pricing: 'free' | 'freemium' | 'paid';
  priceFrom?: string; // например "От $20/мес"
  featured?: boolean;
}

export const CATEGORIES = [
  { id: 'all', name: 'Все инструменты', icon: 'Grid' },
  { id: 'llm', name: 'Языковые модели', icon: 'Brain' },
  { id: 'image', name: 'Изображения', icon: 'Image' },
  { id: 'audio', name: 'Аудио', icon: 'Music' },
  { id: 'video', name: 'Видео', icon: 'Video' },
  { id: 'code', name: 'Код', icon: 'Code' },
  { id: 'other', name: 'Другое', icon: 'Package' }
] as const; 