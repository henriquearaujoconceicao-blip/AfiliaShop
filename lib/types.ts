export interface Product {
  id: string
  name: string
  description: string
  benefit: string
  image: string
  affiliateLink: string
  category: Category
  subcategory?: Subcategory
  originalPrice?: number
  discountPrice?: number
  stock?: number
  isLimitedOffer?: boolean
  offerEndTime?: string
  isFeatured?: boolean
  createdAt: string
}

export type Category =
  | "moda"
  | "eletronicos"
  | "casa"
  | "beleza"
  | "esporte"
  | "acessorios"
  | "viagem"
  | "infantil"
  | "automotivo"
  | "digitais"

export type Subcategory = string

export interface SubcategoryInfo {
  id: string
  label: string
}

export interface CategoryInfo {
  id: Category
  label: string
  icon: string
  subcategories: SubcategoryInfo[]
}

export const categories: CategoryInfo[] = [
  {
    id: "moda",
    label: "Moda e Vestuário",
    icon: "Shirt",
    subcategories: [
      { id: "moda-masculina", label: "Moda Masculina" },
      { id: "moda-feminina", label: "Moda Feminina" },
      { id: "moda-infantil", label: "Moda Infantil" },
      { id: "moda-fitness", label: "Moda Fitness" },
      { id: "moda-praia", label: "Moda Praia" },
      { id: "moda-casual", label: "Moda Casual" },
      { id: "moda-social", label: "Moda Social" },
      { id: "moda-intima", label: "Moda Íntima" },
      { id: "plus-size", label: "Plus Size" },
    ],
  },
  {
    id: "eletronicos",
    label: "Eletrônicos",
    icon: "Smartphone",
    subcategories: [
      { id: "smartphones", label: "Smartphones e Acessórios" },
      { id: "fones", label: "Fones de Ouvido" },
      { id: "smartwatches", label: "Smartwatches" },
      { id: "caixas-som", label: "Caixas de Som" },
      { id: "carregadores", label: "Carregadores e Cabos" },
      { id: "power-banks", label: "Power Banks" },
      { id: "computadores", label: "Computadores e Notebooks" },
      { id: "perifericos", label: "Periféricos" },
      { id: "gadgets", label: "Gadgets Tecnológicos" },
    ],
  },
  {
    id: "casa",
    label: "Casa e Cozinha",
    icon: "Home",
    subcategories: [
      { id: "utensilios", label: "Utensílios de Cozinha" },
      { id: "eletroportateis", label: "Eletroportáteis" },
      { id: "organizacao", label: "Organização Doméstica" },
      { id: "decoracao", label: "Decoração" },
      { id: "cama-mesa-banho", label: "Cama, Mesa e Banho" },
      { id: "iluminacao", label: "Iluminação" },
      { id: "limpeza", label: "Limpeza e Cuidados" },
    ],
  },
  {
    id: "beleza",
    label: "Beleza e Saúde",
    icon: "Sparkles",
    subcategories: [
      { id: "skincare", label: "Cuidados com a Pele" },
      { id: "cabelo", label: "Cuidados com o Cabelo" },
      { id: "maquiagem", label: "Maquiagem" },
      { id: "perfumes", label: "Perfumes" },
      { id: "higiene", label: "Higiene Pessoal" },
      { id: "barbeadores", label: "Aparadores e Barbeadores" },
      { id: "naturais", label: "Produtos Naturais" },
    ],
  },
  {
    id: "esporte",
    label: "Esporte e Fitness",
    icon: "Dumbbell",
    subcategories: [
      { id: "equipamentos-treino", label: "Equipamentos de Treino" },
      { id: "acessorios-fitness", label: "Acessórios Fitness" },
      { id: "roupas-esportivas", label: "Roupas Esportivas" },
      { id: "yoga-pilates", label: "Yoga e Pilates" },
      { id: "corrida-ciclismo", label: "Corrida e Ciclismo" },
      { id: "recuperacao", label: "Recuperação Muscular" },
    ],
  },
  {
    id: "acessorios",
    label: "Acessórios",
    icon: "Watch",
    subcategories: [
      { id: "relogios", label: "Relógios" },
      { id: "oculos", label: "Óculos de Sol" },
      { id: "mochilas-bolsas", label: "Mochilas e Bolsas" },
      { id: "capas-celular", label: "Capas de Celular" },
      { id: "organizadores", label: "Organizadores" },
      { id: "multifuncionais", label: "Itens Multifuncionais" },
    ],
  },
  {
    id: "viagem",
    label: "Viagem e Lazer",
    icon: "Plane",
    subcategories: [
      { id: "praia", label: "Acessórios de Praia" },
      { id: "bolsas-termicas", label: "Bolsas Térmicas" },
      { id: "camping", label: "Camping e Aventura" },
      { id: "mochilas-viagem", label: "Mochilas de Viagem" },
      { id: "organizadores-mala", label: "Organizadores de Mala" },
      { id: "inflaveis", label: "Produtos Infláveis" },
    ],
  },
  {
    id: "infantil",
    label: "Infantil e Bebês",
    icon: "Baby",
    subcategories: [
      { id: "brinquedos-educativos", label: "Brinquedos Educativos" },
      { id: "brinquedos-eletronicos", label: "Brinquedos Eletrônicos" },
      { id: "produtos-bebes", label: "Produtos para Bebês" },
      { id: "roupas-infantis", label: "Roupas Infantis" },
      { id: "material-escolar", label: "Materiais Escolares" },
    ],
  },
  {
    id: "automotivo",
    label: "Automotivo",
    icon: "Car",
    subcategories: [
      { id: "acessorios-carros", label: "Acessórios para Carros" },
      { id: "ferramentas-manuais", label: "Ferramentas Manuais" },
      { id: "ferramentas-eletricas", label: "Ferramentas Elétricas" },
      { id: "organizacao-auto", label: "Organização Automotiva" },
      { id: "limpeza-auto", label: "Limpeza Automotiva" },
    ],
  },
  {
    id: "digitais",
    label: "Digitais",
    icon: "Download",
    subcategories: [
      { id: "ebooks", label: "eBooks" },
      { id: "cursos", label: "Cursos Online" },
      { id: "assinaturas", label: "Assinaturas" },
      { id: "templates", label: "Templates Digitais" },
      { id: "aplicativos", label: "Aplicativos" },
    ],
  },
]

// Helper to get category by id
export function getCategoryById(id: Category): CategoryInfo | undefined {
  return categories.find((c) => c.id === id)
}

// Helper to get subcategory label
export function getSubcategoryLabel(categoryId: Category, subcategoryId: string): string {
  const category = getCategoryById(categoryId)
  const subcategory = category?.subcategories.find((s) => s.id === subcategoryId)
  return subcategory?.label || subcategoryId
}
