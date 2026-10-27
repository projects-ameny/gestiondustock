import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard', standalone: true, imports: [RouterLink, MatButtonModule],
  templateUrl: './dashboard.html', styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly metrics = [
    { icon: '▦', label: 'Total des produits', value: '1 284', note: '+ 8,2 % ce mois', tone: 'blue' },
    { icon: '€', label: 'Valeur du stock', value: '84 250 €', note: '+ 3,4 % ce mois', tone: 'purple' },
    { icon: '!', label: 'Stock faible', value: '24', note: 'À réapprovisionner', tone: 'amber' },
    { icon: '↘', label: 'Ruptures de stock', value: '7', note: 'Action requise', tone: 'red' },
  ];
  readonly days = [
    { name: 'Lun', in: 78, out: 45 }, { name: 'Mar', in: 110, out: 62 },
    { name: 'Mer', in: 92, out: 56 }, { name: 'Jeu', in: 130, out: 72 },
    { name: 'Ven', in: 102, out: 49 }, { name: 'Sam', in: 145, out: 88 }, { name: 'Dim', in: 120, out: 64 },
  ];
  readonly categories = [
    { name: 'Électronique', value: 84, color: 'blue' }, { name: 'Accessoires', value: 54, color: 'purple' },
    { name: 'Mobilier', value: 36, color: 'green' }, { name: 'Autres', value: 26, color: 'orange' },
  ];
  readonly alerts = [
    { name: 'Casque audio Studio Pro', ref: 'AUD-2041', category: 'Électronique', qty: '3', min: '10', status: 'Stock faible', tone: 'warning' },
    { name: 'Clavier mécanique K80', ref: 'ACC-1187', category: 'Accessoires', qty: '0', min: '8', status: 'Rupture', tone: 'danger' },
    { name: 'Lampe de bureau Nova', ref: 'MOB-0562', category: 'Mobilier', qty: '2', min: '6', status: 'Stock faible', tone: 'warning' },
  ];
}
