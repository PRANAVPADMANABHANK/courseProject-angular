import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../shared/products";
import {map} from "rxjs/operators";


@Injectable({providedIn: "root"})

export class ProductService{

    constructor(private http: HttpClient){}

    createProduct(products: {pName: string, desc: string, price: string}){
      const headers = new HttpHeaders({"myHeader":"angularDemo"})
      this.http.post<{name: string}>('https://formdemo-830bd-default-rtdb.firebaseio.com/products.json', products, {headers:headers}).subscribe((res)=>{
      console.log(res, "post response")
    })
    }

    fetchProduct(){
       return this.http.get<{[key: string]: Product}>('https://formdemo-830bd-default-rtdb.firebaseio.com/products.json').pipe(map((res)=>{
      const products = []
      for(const key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key], id: key}) //here we will transform the response
        }
      }
      return products;
    }))
    }

    deleteProduct(id:string){
        this.http.delete('https://formdemo-830bd-default-rtdb.firebaseio.com/products/'+id+'.json').subscribe()

    }

    deleteAllProducts(){
        this.http.delete('https://formdemo-830bd-default-rtdb.firebaseio.com/products.json').subscribe()

    }

    updateProduct(id:string, value: Product){
      this.http.put('https://formdemo-830bd-default-rtdb.firebaseio.com/products/'+id+'.json',value).subscribe()
    }
}