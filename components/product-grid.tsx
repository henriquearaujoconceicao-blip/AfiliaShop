"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { CategoryTabs } from "./category-tabs"
import { SubcategoryFilter } from "./subcategory-filter"
import { FeaturedCarousel } from "./featured-carousel"
import type { Product, Category } from "@/lib/types"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all")
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)

  const featuredProducts = products.filter((p) => p.isFeatured)

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true
    if (p.category !== activeCategory) return false
    if (activeSubcategory && p.subcategory !== activeSubcategory) return false
    return true
  })

  const handleCategoryChange = (category: Category | "all") => {
    setActiveCategory(category)
    setActiveSubcategory(null)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Featured Section */}
      {featuredProducts.length > 0 && (
        <section aria-label="Produtos em destaque">
          <FeaturedCarousel products={featuredProducts} />
        </section>
      )}

      {/* Categories */}
      <section aria-label="Categorias">
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      </section>

      {activeCategory !== "all" && (
        <section aria-label="Subcategorias">
          <SubcategoryFilter
            activeCategory={activeCategory}
            activeSubcategory={activeSubcategory}
            onSubcategoryChange={setActiveSubcategory}
          />
        </section>
      )}

      {/* Product Grid */}
      <section aria-label="Lista de produtos">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </section>
    </div>
  )
}
