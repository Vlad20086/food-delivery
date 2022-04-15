import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  foodItems:any = [];
  totalPrice:number = 0;
  
  constructor() {}  
    addToCart(food:any){
      // if(this.foodItems.length !== 0){
      //   // for(let i = 0; this.foodItems.length > 0; i++){
      //     if (this.foodItems.indexOf(food) === -1) {
      //       this.foodItems.push(food);
      //     }else {
      //       alert("already added to cart"); 
      //     }
      //   // }
      // }else {
      //   this.foodItems.push(food);
      // }
        this.foodItems.push(food);
    }
    getFoodItems(){
      this.subTotal();
      return this.foodItems;
    }
    clearFoodItems(){
      this.totalPrice  = 0;
      this.subTotal();
      this.foodItems.splice(0,this.foodItems.length)
      return this.foodItems;
    }

    subTotal(){
      for(let i = 0; i < this.foodItems.length; i++){
         this.totalPrice += parseInt(this.foodItems[i].price);
      }
    }
    removeOneFood(id:number){
      for (let item of this.foodItems) {
        if (id === item.food_id) {
            this.foodItems.splice(this.foodItems.indexOf(item), 1);
            this.totalPrice = 0;
            this.subTotal();
        }
        return this.foodItems;
      }
    }
}
