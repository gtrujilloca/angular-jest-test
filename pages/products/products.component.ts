import { Product } from '@/domain';
import { ShopService } from '@/infraestructure';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sh-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone: true,
  imports: [RouterLink],
  providers: [
    ShopService,
  ],
})
export class ProductsComponent implements OnInit {
  shopSrv = inject(ShopService);
  products = signal<Product[]>([]);

  ngOnInit(): void {
   this.getAllProducts();
  }

  getAllProducts() {
    this.shopSrv
      .getProducts({
        limit: 5,
        sort: 'desc'
      })
      .subscribe((products) => this.products.set(products));
  }
}
