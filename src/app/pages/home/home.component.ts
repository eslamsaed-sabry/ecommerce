import { CategoryService } from '../../core/services/category/category.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { error } from 'console';
import { IProduct } from '../../shared/interface/IProduct';
import { ICategory } from '../../shared/interface/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [CarouselModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService)
  private readonly categoryService = inject(CategoryService)

  myProducts: IProduct[] = []
  myCategory: ICategory[] = []
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }



  callProduct() {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.myProducts = res.data
      },
      error: (err) => {
        console.log(err);

      }
    })

  }
  callCategory() {
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        this.myCategory = res.data
      },
      error: (err) => {
        console.log(err);

      }
    })

  }

  ngOnInit(): void {
    this.callProduct()
    this.callCategory()
  }

}
