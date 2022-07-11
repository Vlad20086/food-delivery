import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  foodData:any;

  hide:boolean = false;
  foodCartData:any;
  foodId!:number;
  headingMsg:string = "";

  constructor(private api:ApiService, private front:FrontendService) { }

  getFood(){
    this.api.getFood().subscribe({
      next:data=>{
        console.warn(data);
        this.foodData = data.body;
      },
      error: error=>{
        console.warn(error.message);
      }
    })
  }
  closeModel(){
    this.hide = false;
  }
  askAddCart(food:any){
    this.headingMsg = "Add to this Cart ? :D"
    this.hide = true;
    this.foodCartData = food;
  }
  addCart(){
    this.front.addToCart(this.foodCartData);
    this.foodId = this.foodCartData.food_id;
    this.closeModel();
    // console.warn(this.front.getFoodItems());
  }
  
  ngOnInit(): void {
    this.getFood();
  }

}
