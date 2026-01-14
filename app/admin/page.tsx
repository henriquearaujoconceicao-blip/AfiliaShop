"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, Pencil, Trash2, Package, ImageIcon, LinkIcon, Tag, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { mockProducts } from "@/lib/data"
import { categories, type Product, type Category } from "@/lib/types"
import { useSupport } from "@/lib/support-context"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.644.069-4.849.069-3.204 0-3.584-.014-4.849-.072-4.358-.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { links, updateLinks } = useSupport()
  const [supportForm, setSupportForm] = useState(links)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    benefit: "",
    image: "",
    affiliateLink: "",
    category: "eletronicos" as Category,
    subcategory: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
    isLimitedOffer: false,
    isFeatured: false,
  })

  const selectedCategory = categories.find((c) => c.id === formData.category)
  const subcategories = selectedCategory?.subcategories || []

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      benefit: "",
      image: "",
      affiliateLink: "",
      category: "eletronicos",
      subcategory: "",
      originalPrice: "",
      discountPrice: "",
      stock: "",
      isLimitedOffer: false,
      isFeatured: false,
    })
    setEditingProduct(null)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      benefit: product.benefit,
      image: product.image,
      affiliateLink: product.affiliateLink,
      category: product.category,
      subcategory: product.subcategory || "",
      originalPrice: product.originalPrice?.toString() || "",
      discountPrice: product.discountPrice?.toString() || "",
      stock: product.stock?.toString() || "",
      isLimitedOffer: product.isLimitedOffer || false,
      isFeatured: product.isFeatured || false,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      benefit: formData.benefit,
      image: formData.image || "/diverse-products-still-life.png",
      affiliateLink: formData.affiliateLink,
      category: formData.category,
      subcategory: formData.subcategory || undefined,
      originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
      discountPrice: formData.discountPrice ? Number.parseFloat(formData.discountPrice) : undefined,
      stock: formData.stock ? Number.parseInt(formData.stock) : undefined,
      isLimitedOffer: formData.isLimitedOffer,
      offerEndTime: formData.isLimitedOffer ? new Date(Date.now() + 3600000 * 24).toISOString() : undefined,
      isFeatured: formData.isFeatured,
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
    }

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? newProduct : p)))
    } else {
      setProducts([newProduct, ...products])
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleCategoryChange = (value: Category) => {
    setFormData({ ...formData, category: value, subcategory: "" })
  }

  const handleSaveSupportLinks = () => {
    updateLinks(supportForm)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="rounded-full p-2 transition-colors hover:bg-secondary" aria-label="Voltar">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-bold text-foreground">Painel Admin</h1>
          </div>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">
                  {editingProduct ? "Editar Produto" : "Novo Produto"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Nome do Produto
                  </Label>
                  <div className="relative">
                    <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Fone Bluetooth Pro"
                      className="pl-9 bg-background border-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefit" className="text-foreground">
                    Benefício Principal
                  </Label>
                  <Input
                    id="benefit"
                    value={formData.benefit}
                    onChange={(e) => setFormData({ ...formData, benefit: e.target.value })}
                    placeholder="Ex: Som cristalino sem fios"
                    className="bg-background border-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    Descrição
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Breve descrição do produto..."
                    className="bg-background border-border resize-none"
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-foreground">
                    URL da Imagem
                  </Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://exemplo.com/imagem.jpg"
                      className="pl-9 bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="affiliateLink" className="text-foreground">
                    Link de Afiliado
                  </Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="affiliateLink"
                      value={formData.affiliateLink}
                      onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
                      placeholder="https://amazon.com.br/..."
                      className="pl-9 bg-background border-border"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-foreground">
                      Categoria
                    </Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="bg-background border-border">
                        <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border max-h-60">
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subcategory" className="text-foreground">
                      Subcategoria
                    </Label>
                    <Select
                      value={formData.subcategory}
                      onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border max-h-60">
                        {subcategories.map((sub) => (
                          <SelectItem key={sub.id} value={sub.id}>
                            {sub.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice" className="text-foreground">
                      Preço Original (R$)
                    </Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="299.90"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountPrice" className="text-foreground">
                      Preço com Desconto (R$)
                    </Label>
                    <Input
                      id="discountPrice"
                      type="number"
                      step="0.01"
                      value={formData.discountPrice}
                      onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                      placeholder="149.90"
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-foreground">
                    Estoque (opcional)
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="Ex: 10"
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-4 rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Oferta Limitada</Label>
                      <p className="text-xs text-muted-foreground">Exibe contador de tempo</p>
                    </div>
                    <Switch
                      checked={formData.isLimitedOffer}
                      onCheckedChange={(checked) => setFormData({ ...formData, isLimitedOffer: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Destacar Produto</Label>
                      <p className="text-xs text-muted-foreground">Aparece no carrossel</p>
                    </div>
                    <Switch
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {editingProduct ? "Salvar Alterações" : "Criar Produto"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{products.length}</p>
              <p className="text-xs text-muted-foreground">Produtos</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{products.filter((p) => p.isFeatured).length}</p>
              <p className="text-xs text-muted-foreground">Destaques</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{products.filter((p) => p.isLimitedOffer).length}</p>
              <p className="text-xs text-muted-foreground">Ofertas</p>
            </CardContent>
          </Card>
        </div>

        {/* Support Links Section */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Links de Suporte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-foreground flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                value={supportForm.whatsapp}
                onChange={(e) => setSupportForm({ ...supportForm, whatsapp: e.target.value })}
                placeholder="5511999999999 (apenas números)"
                className="bg-background border-border"
              />
              <p className="text-xs text-muted-foreground">Digite o número com código do país (ex: 5511999999999)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-foreground flex items-center gap-2">
                <InstagramIcon className="h-4 w-4 text-[#E4405F]" />
                Instagram
              </Label>
              <Input
                id="instagram"
                value={supportForm.instagram}
                onChange={(e) => setSupportForm({ ...supportForm, instagram: e.target.value })}
                placeholder="@seuusuario"
                className="bg-background border-border"
              />
              <p className="text-xs text-muted-foreground">Digite seu usuário do Instagram (com ou sem @)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telegram" className="text-foreground flex items-center gap-2">
                <TelegramIcon className="h-4 w-4 text-[#0088cc]" />
                Telegram
              </Label>
              <Input
                id="telegram"
                value={supportForm.telegram}
                onChange={(e) => setSupportForm({ ...supportForm, telegram: e.target.value })}
                placeholder="@seuusuario"
                className="bg-background border-border"
              />
              <p className="text-xs text-muted-foreground">Digite seu usuário do Telegram (com ou sem @)</p>
            </div>

            <Button
              onClick={handleSaveSupportLinks}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Salvar Links de Suporte
            </Button>
          </CardContent>
        </Card>

        {/* Product List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Produtos Cadastrados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-0">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-3"
              >
                <div
                  className="h-16 w-16 shrink-0 rounded-lg bg-cover bg-center bg-secondary"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{product.benefit}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {product.discountPrice && (
                      <span className="text-sm font-semibold text-primary">
                        R$ {product.discountPrice.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {categories.find((c) => c.id === product.category)?.label}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Excluir"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
