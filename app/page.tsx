import { ProductGrid } from "@/components/product-grid"
import { Header } from "@/components/header"
import { SocialSupportButtons } from "@/components/social-support-buttons"
import { mockProducts } from "@/lib/data"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-lg px-4 py-6">
        <ProductGrid products={mockProducts} />
      </main>

      <SocialSupportButtons />
    </div>
  )
}
