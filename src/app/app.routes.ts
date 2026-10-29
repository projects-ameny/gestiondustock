import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard';
import { Products } from './pages/products';
import { Test } from './pages/test/test';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'test', component: Test, title: 'Test' },
  { path: 'dashboard', component: Dashboard, title: 'Vue d’ensemble · StockFlow' },
  { path: 'produits', component: Products, title: 'Produits · StockFlow' },
  { path: '**', redirectTo: 'test' },
];
