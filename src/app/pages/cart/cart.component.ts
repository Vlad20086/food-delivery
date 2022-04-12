import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public front:FrontendService) { }
  foodCartItems:any = [];
  subTotal:number = 0;
  foodPrice:number = 0;

  totalItems:number = this.foodCartItems.length; 

  showForm:boolean = false;

  foodCart(){
    this.foodCartItems = this.front.getFoodItems();
    for(let i = 0; i < this.foodCartItems.length; i++){
      this.subTotal += parseInt(this.foodCartItems[i].price);
    }
  }
  // addCounter(event:any){
  //   this.repeatFoodCount +=1;
  // }
  // minusCounter(event:any){
  //   if(this.repeatFoodCount > 1 ){
  //     this.repeatFoodCount -=1;
  //   }else {
  //     this.repeatFoodCount =1;
  //   }
  // }
  openUserForm(){
    this.showForm = true;
  }
  closeUserOrderForm(){
    this.showForm = false;
  }

  ngOnInit(): void {
    this.foodCart(); 
  }
}
