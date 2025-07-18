import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { IProduct } from '../../shared/interface/IProduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)

  prodID : any;
  prodData : IProduct | null=null;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
      this.prodID = res.get('id')
      this.productsService.getSpecifitcproduct(this.prodID).subscribe({
        next:(res)=>{
          this.prodData = res.data
           
        },
        error:(err)=>{
          console.log(err);
          
        }
      })

      }
    })
  }
}
