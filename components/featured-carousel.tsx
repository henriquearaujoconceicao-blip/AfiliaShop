"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CountdownTimer } from "./countdown-timer"
import type { Product } from "@/lib/types"

interface FeaturedCarouselProps {
  products: Product[]
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [products.length])

  const prev = () => setCurrent((prev) => (prev - 1 + products.length) % products.length)
  const next = () => setCurrent((prev) => (prev + 1) % products.length)

  if (products.length === 0) return null

  const product = products[current]
  const discount =
    product.originalPrice && product.discountPrice
      ? Math.round((1 - product.discountPrice / product.originalPrice) * 100)
      : 0

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-background">
      <div className="flex items-center gap-6 p-6">
        {/* Image */}
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl bg-background/50">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          {discount > 0 && (
            <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground font-bold">-{discount}%</Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary/50 text-primary">
              Destaque
            </Badge>
            {product.isLimitedOffer && product.offerEndTime && (
              <CountdownTimer endTime={product.offerEndTime} compact />
            )}
          </div>

          <h2 className="text-xl font-bold text-foreground">{product.name}</h2>
          <p className="text-sm text-primary font-medium">{product.benefit}</p>

          <div className="flex items-center gap-3">
            {product.originalPrice && product.discountPrice && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
            <span className="text-2xl font-bold text-foreground">
              R$ {(product.discountPrice || product.originalPrice || 0).toFixed(2).replace(".", ",")}
            </span>
          </div>

          <Button
            asChild
            className="w-fit bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20"
          >
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              COMPRAR AGORA
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      {products.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-all hover:bg-background"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-all hover:bg-background"
            aria-label="Próximo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === current ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
