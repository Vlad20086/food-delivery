import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  foodData:any;
  headingMsg!:string;
  
  hide:boolean = false;
  foodCartData:any;
  foodId!:number;
  title:string = "Cludkitchenweb";

  constructor(private api:ApiService, public front:FrontendService) { }

  getFood(){
    this.api.getFoodLimit().subscribe({
      next:data=>{
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
  }
  ngOnInit(): void {
    this.getFood();
  }

}
