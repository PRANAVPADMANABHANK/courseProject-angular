import { HttpClient , HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../shared/products";
import {map, catchError} from "rxjs/operators";
import { Subject, throwError } from "rxjs";


@Injectable({providedIn: "root"})

export class ProductService{

    error = new Subject<string>();

    constructor(private http: HttpClient){}

    createProduct(products: {pName: string, desc: string, price: string}){
      const headers = new HttpHeaders({"myHeader":"angularDemo"})
      this.http.post<{name: string}>('https://formdemo-830bd-default-rtdb.firebaseio.com/products.json', products, {headers:headers}).subscribe((res)=>{
      console.log(res, "post response")
    }, (err)=>{
      this.error.next(err.message)
    })
    }

    fetchProduct(){
      const header = new HttpHeaders().set('content-type','application/json').set('Access-control-Allow-Origin','*')
      const params = new HttpParams().set('print','pretty').set('pageNumber',1)  
      return this.http.get<{[key: string]: Product}>('https://formdemo-830bd-default-rtdb.firebaseio.com/products.json', {headers: header, params: params}).pipe(map((res)=>{
      const products = []
      for(const key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key], id: key}) //here we will transform the response
        }
      }
      return products;
    }), catchError((err)=>{

      return throwError(err)
    }))
    }

    deleteProduct(id:string){
      let header = new HttpHeaders()
      header = header.append('myHeader1','value1');
      header = header.append('myHeader2','value2');
        this.http.delete('https://formdemo-830bd-default-rtdb.firebaseio.com/products/'+id+'.json', {headers: header}).subscribe()

    }

    deleteAllProducts(){
        this.http.delete('https://formdemo-830bd-default-rtdb.firebaseio.com/products.json').subscribe()

    }

    updateProduct(id:string, value: Product){
      this.http.put('https://formdemo-830bd-default-rtdb.firebaseio.com/products/'+id+'.json',value).subscribe()
    }
}