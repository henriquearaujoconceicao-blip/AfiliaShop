"use client"

import Link from "next/link"
import { Heart, Settings, ShoppingBag } from "lucide-react"
import { useFavorites } from "@/lib/favorites-context"

export function Header() {
  const { favorites } = useFavorites()

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <ShoppingBag className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">AfiliaShop</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/favoritos"
            className="relative rounded-full p-2 transition-colors hover:bg-secondary"
            aria-label="Favoritos"
          >
            <Heart className="h-5 w-5 text-foreground" />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            href="/admin"
            className="rounded-full p-2 transition-colors hover:bg-secondary"
            aria-label="Configurações"
          >
            <Settings className="h-5 w-5 text-foreground" />
          </Link>
        </div>
      </div>
    </header>
  )
}
