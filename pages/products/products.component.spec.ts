import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getProductsMock } from '@/__tests__/mock/product';
import { ShopService } from '@/infraestructure';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, provideRouter, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { ProductsComponent } from './products.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let shopSrv: ShopService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsComponent,
        RouterLink,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }
    ).compileComponents();
  });

  beforeEach(() => {
    shopSrv = TestBed.overrideProvider(ShopService,{
      useValue: { getProducts: jest.fn() }
    }).inject(ShopService);
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    jest.spyOn(shopSrv, 'getProducts').mockReturnValue(of(getProductsMock()));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get products', () => {
    component.getAllProducts();

    expect(shopSrv.getProducts).toHaveBeenCalled();
    expect(component.products().length).toBeGreaterThan(0);
  });
});
