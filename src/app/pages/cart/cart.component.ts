import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public front:FrontendService) { }
  foodPrice:number = 0;

  showForm:boolean = false;

  openUserForm(){
    this.showForm = true;
  }
  closeUserOrderForm(){
    this.showForm = false;
  }

  ngOnInit(): void {
    this.front.getFoodItems();
  }

}
