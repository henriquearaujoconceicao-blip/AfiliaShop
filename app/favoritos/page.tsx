"use client"

import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { SocialSupportButtons } from "@/components/social-support-buttons"
import { useFavorites } from "@/lib/favorites-context"
import { mockProducts } from "@/lib/data"

export default function FavoritosPage() {
  const { favorites } = useFavorites()
  const favoriteProducts = mockProducts.filter((p) => favorites.includes(p.id))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-lg items-center gap-4 px-4">
          <Link href="/" className="rounded-full p-2 transition-colors hover:bg-secondary" aria-label="Voltar">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <h1 className="font-bold text-foreground">Favoritos</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="rounded-full bg-secondary p-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Nenhum favorito ainda</h2>
              <p className="text-sm text-muted-foreground">Toque no coração dos produtos para salvá-los aqui.</p>
            </div>
            <Link
              href="/"
              className="mt-4 rounded-full bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ver produtos
            </Link>
          </div>
        )}
      </main>

      <SocialSupportButtons />
    </div>
  )
}
