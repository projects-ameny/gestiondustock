import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Product { name: string; ref: string; category: string; price: number; quantity: number; status: 'En stock' | 'Stock faible' | 'Rupture'; icon: string; tone: string; }

@Component({
  selector: 'app-products', standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './products.html', styleUrl: './products.css',
})
export class Products {
  search = '';
  categoryFilter = 'Toutes les catégories';
  stockFilter = 'Tous les statuts';
  showForm = false;
  productName = '';
  productRef = '';
  productCategory = 'Électronique';
  productPrice: number | null = null;
  productQuantity: number | null = null;
  readonly categories = ['Toutes les catégories', 'Électronique', 'Accessoires', 'Mobilier'];
  readonly statuses = ['Tous les statuts', 'En stock', 'Stock faible', 'Rupture'];
  products: Product[] = [
    { name: 'Casque audio Studio Pro', ref: 'AUD-2041', category: 'Électronique', price: 129, quantity: 3, status: 'Stock faible', icon: '◖', tone: 'lavender' },
    { name: 'Clavier mécanique K80', ref: 'ACC-1187', category: 'Accessoires', price: 89, quantity: 0, status: 'Rupture', icon: '⌨', tone: 'mint' },
    { name: 'Lampe de bureau Nova', ref: 'MOB-0562', category: 'Mobilier', price: 64, quantity: 2, status: 'Stock faible', icon: '♧', tone: 'peach' },
    { name: 'Écran UltraWide 34 pouces', ref: 'ELE-3408', category: 'Électronique', price: 549, quantity: 18, status: 'En stock', icon: '▣', tone: 'blue' },
    { name: 'Souris sans fil Ergo', ref: 'ACC-0921', category: 'Accessoires', price: 42, quantity: 26, status: 'En stock', icon: '◉', tone: 'rose' },
    { name: 'Support ordinateur en bois', ref: 'MOB-0624', category: 'Mobilier', price: 38, quantity: 5, status: 'Stock faible', icon: '▱', tone: 'sand' },
    { name: 'Webcam 4K Conference', ref: 'ELE-1872', category: 'Électronique', price: 149, quantity: 32, status: 'En stock', icon: '◉', tone: 'mint' },
    { name: 'Hub USB-C 7-en-1', ref: 'ACC-2351', category: 'Accessoires', price: 59, quantity: 0, status: 'Rupture', icon: '⌁', tone: 'lavender' },
  ];

  get filteredProducts(): Product[] {
    const query = this.search.trim().toLocaleLowerCase('fr');
    return this.products.filter((product) =>
      (!query || `${product.name} ${product.ref} ${product.category}`.toLocaleLowerCase('fr').includes(query)) &&
      (this.categoryFilter === 'Toutes les catégories' || product.category === this.categoryFilter) &&
      (this.stockFilter === 'Tous les statuts' || product.status === this.stockFilter),
    );
  }
  get lowStockCount(): number { return this.products.filter((product) => product.status === 'Stock faible').length; }
  get outOfStockCount(): number { return this.products.filter((product) => product.status === 'Rupture').length; }
  get inStockCount(): number { return this.products.filter((product) => product.status === 'En stock').length; }

  addProduct(): void {
    const name = this.productName.trim();
    const ref = this.productRef.trim();
    if (!name || !ref || this.productPrice === null || this.productQuantity === null) return;
    const quantity = this.productQuantity;
    this.products = [{ name, ref, category: this.productCategory, price: this.productPrice, quantity,
      status: quantity === 0 ? 'Rupture' : quantity < 6 ? 'Stock faible' : 'En stock', icon: '▦', tone: 'blue' }, ...this.products];
    this.productName = ''; this.productRef = ''; this.productPrice = null; this.productQuantity = null;
    this.showForm = false;
  }
  exportCsv(): void {
    const rows = [['Produit', 'Référence', 'Catégorie', 'Prix unitaire', 'Quantité', 'Statut'], ...this.filteredProducts.map((p) => [p.name, p.ref, p.category, `${p.price} €`, String(p.quantity), p.status])];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(';')).join('\r\n');
    const blob = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'stockflow-produits.csv'; anchor.click(); URL.revokeObjectURL(url);
  }
}
