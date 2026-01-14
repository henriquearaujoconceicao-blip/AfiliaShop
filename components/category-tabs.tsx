"use client"

import type React from "react"

import { categories, type Category } from "@/lib/types"
import { Shirt, Smartphone, Home, Sparkles, Dumbbell, Watch, Plane, Baby, Car, Download } from "lucide-react"

interface CategoryTabsProps {
  activeCategory: Category | "all"
  onCategoryChange: (category: Category | "all") => void
}

const iconMap: Record<string, React.ElementType> = {
  Shirt,
  Smartphone,
  Home,
  Sparkles,
  Dumbbell,
  Watch,
  Plane,
  Baby,
  Car,
  Download,
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onCategoryChange("all")}
        className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
          activeCategory === "all"
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        Todos
      </button>
      {categories.map((category) => {
        const Icon = iconMap[category.icon]
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === category.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span className="whitespace-nowrap">{category.label}</span>
          </button>
        )
      })}
    </div>
  )
}
