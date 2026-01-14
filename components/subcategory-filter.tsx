"use client"

import { categories, type Category } from "@/lib/types"

interface SubcategoryFilterProps {
  activeCategory: Category
  activeSubcategory: string | null
  onSubcategoryChange: (subcategory: string | null) => void
}

export function SubcategoryFilter({ activeCategory, activeSubcategory, onSubcategoryChange }: SubcategoryFilterProps) {
  const category = categories.find((c) => c.id === activeCategory)

  if (!category) return null

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSubcategoryChange(null)}
        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
          activeSubcategory === null
            ? "bg-primary/20 text-primary border border-primary/30"
            : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
        }`}
      >
        Todos
      </button>
      {category.subcategories.map((sub) => (
        <button
          key={sub.id}
          onClick={() => onSubcategoryChange(sub.id)}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            activeSubcategory === sub.id
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}
        >
          {sub.label}
        </button>
      ))}
    </div>
  )
}
