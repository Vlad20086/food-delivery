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
  foodPrice:number = 0;

  totalItems:number = this.foodCartItems.length; 

  showForm:boolean = false;

  foodCart(){
    this.foodCartItems = this.front.getFoodItems();
  }
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
