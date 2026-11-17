import type { IconName } from '../../components/ui/Icon'
import { products } from './products'

type CategoryDefinition = { id: number; slug: string; title: string; icon: IconName }

const categoryDefinitions: CategoryDefinition[] = [
  { id: 1, slug: 'other', title: 'سایر موارد', icon: 'grid' },
  { id: 2, slug: 'security', title: 'امنیت', icon: 'shield' },
  { id: 3, slug: 'learning', title: 'آموزش', icon: 'learn' },
  { id: 4, slug: 'productivity', title: 'بهره‌وری', icon: 'briefcase' },
  { id: 5, slug: 'cloud', title: 'فضای ابری', icon: 'cloud' },
  { id: 6, slug: 'ai', title: 'هوش مصنوعی', icon: 'ai' },
  { id: 7, slug: 'entertainment', title: 'سرگرمی', icon: 'play' },
  { id: 8, slug: 'gaming', title: 'بازی', icon: 'game' },
]

export const categories = categoryDefinitions.map(category => ({
  ...category,
  count: products.filter(product => product.categorySlug === category.slug).length,
}))
