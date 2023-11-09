import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/shared/products';
import { Subscription } from 'rxjs-compat/Subscription';

@Component({
  selector: 'app-accesories',
  templateUrl: './accesories.component.html',
  styleUrls: ['./accesories.component.css']
})
export class AccesoriesComponent implements OnInit, OnDestroy {

  title = 'AngularHttpRequest';
  allProducts : Product[] = [];
  editMode : boolean = false
  currentProductId: string
  errorMessage : string = null;
  errorSub: Subscription 
  @ViewChild('productsForm') form: NgForm


  constructor(private productService: ProductService){}

  ngOnInit(){
    this.fetchProducts()
    this.errorSub =  this.productService.error.subscribe((message)=>{
      this.errorMessage = message;
    })
  }

  onProductsFetch(){
    this.fetchProducts()
  }

  onProductCreate(products: {pName: string, desc: string, price: string}){
    if(!this.editMode){
      this.productService.createProduct(products)
    }else{
      this.productService.updateProduct(this.currentProductId, products)
    }
    
  }

  onDeleteProduct(id:string){
    this.productService.deleteProduct(id)
  }

  onDeleteAllProduct(){
    this.productService.deleteAllProducts()
  }

  onEditProduct(id: string){
    this.currentProductId = id

    this.editMode = true
    console.log(id, "edit id got")
    let currentProduct =  this.allProducts.find((p)=>{return p.id === id})
    console.log(this.form, "form")

    this.form.setValue({
      pName: currentProduct.pName,
      desc: currentProduct.desc,
      price: currentProduct.price
    });
  }


  private fetchProducts(){
    this.productService.fetchProduct().subscribe((products)=>{
      console.log(products, "get response")
      this.allProducts = products
    },(err)=>{
      this.errorMessage = err.message
      console.log(this.errorMessage, "errormessage")
    })
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe()
  }
}
