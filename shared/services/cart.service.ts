import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {
numOfCartItems:BehaviorSubject<number>= new BehaviorSubject(0)
cartId:BehaviorSubject<string>= new BehaviorSubject('')
  

constructor(private _HttpClient:HttpClient) { 
    this.getCart().subscribe({
      next:(res)=>{
        this.numOfCartItems.next(res.numOfCartItems)
        this.cartId.next(res.data._id)
      } 
      
    })
  }
  addProductToCart(id:String):Observable<any>{
    return this._HttpClient.post('https://route-ecommerce.onrender.com/api/v1/cart',{
      productId:id
    })
  }
  getCart():Observable<any>{
    return this._HttpClient.get('https://route-ecommerce.onrender.com/api/v1/cart',
    )
  }
  updateProductCount(count:number ,id:string):Observable<any>
  {
     return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
count:`${count}`
     }
      )
    }
  removeproduct(id:string):Observable<any>
  {
     return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
     ,
      )
    }
  generateOnlinePayment(cartId:string,shippingAddress:any):Observable<any>
  {
     return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`
     ,{
      shippingAddress:shippingAddress
     }
      )
    }
}
