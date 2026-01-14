import { Package } from "lucide-react"

interface StockBadgeProps {
  stock: number
}

export function StockBadge({ stock }: StockBadgeProps) {
  const isLow = stock <= 10

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isLow ? "bg-destructive/15 text-destructive" : "bg-success/15 text-success"
      }`}
    >
      <Package className="h-3 w-3" />
      <span>{isLow ? `Só ${stock} restantes!` : `${stock} em estoque`}</span>
    </div>
  )
}
