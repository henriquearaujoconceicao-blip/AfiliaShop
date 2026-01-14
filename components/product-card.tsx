"use client"

import Image from "next/image"
import { Heart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CountdownTimer } from "./countdown-timer"
import { StockBadge } from "./stock-badge"
import { useFavorites } from "@/lib/favorites-context"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(product.id)

  const discount =
    product.originalPrice && product.discountPrice
      ? Math.round((1 - product.discountPrice / product.originalPrice) * 100)
      : 0

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
        {discount > 0 && <Badge className="bg-primary text-primary-foreground font-bold">-{discount}%</Badge>}
        {product.isFeatured && (
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            Destaque
          </Badge>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(product.id)}
        className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
        aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${favorite ? "fill-primary text-primary" : "text-muted-foreground"}`}
        />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="flex flex-col gap-3 p-4">
        {/* Urgency Elements */}
        <div className="flex flex-wrap items-center gap-2">
          {product.isLimitedOffer && product.offerEndTime && <CountdownTimer endTime={product.offerEndTime} compact />}
          {product.stock !== undefined && product.stock <= 20 && <StockBadge stock={product.stock} />}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground line-clamp-1 text-lg">{product.name}</h3>
          <p className="text-sm text-primary font-medium">{product.benefit}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          {product.originalPrice && product.discountPrice ? (
            <>
              <span className="text-xs text-muted-foreground line-through">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-xl font-bold text-foreground">
                R$ {product.discountPrice.toFixed(2).replace(".", ",")}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-foreground">
              R$ {(product.originalPrice || product.discountPrice || 0).toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base py-6 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
        >
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            COMPRAR AGORA
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
