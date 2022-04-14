import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css']
})
export class MenupageComponent implements OnInit {

  menuData:any;

  hide:boolean = false;
  foodCartData:any;
  foodId!:number;
  headingMsg:string = "";

  constructor(private param:ActivatedRoute, private route:Router,  private api:ApiService, private front:FrontendService) { }
  
  orderForm = new FormGroup({
    "name": new FormControl("", [Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z]+$')]  ),
    "address": new FormControl("", [Validators.required, Validators.minLength(20)]),
    "number": new FormControl("", [Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
  })

  get name(){
    return this.orderForm.get("name");
  }
  get address(){
    return this.orderForm.get("address");
  }
  get number(){
    return this.orderForm.get("number");
  }
  
  message:string = "";
  placeOrder(id:any){
    const formData  = new FormData();
    let order_id = Math.floor(Math.random()*999999-999+1)+999;
    formData.append("name", this.orderForm.value.name);
    formData.append("address", this.orderForm.value.address);
    formData.append("number", this.orderForm.value.number);
    formData.append("food_id",id);
    formData.append("order_id",order_id.toString());
    this.api.addOrder(formData).subscribe({
      next:data=>{
        this.message = "Your order has been Recieved, We'll soon contact you :)"
        console.warn(data);
        setTimeout(()=>{
          this.message = "";
          this.route.navigate(['track-order'], {fragment:data.order_id})
        },2000)
      },
      error:error=>{
        this.message = error.message;
        setTimeout(()=>{
          this.message = "";
        },4000)
      }
    })
  }
  food_id:any = 0;
  getFood(){
    let id = this.param.snapshot.paramMap.get('id');
    this.api.getOneFood(id).subscribe({
      next:data=>{
        // console.warn(data);
        this.menuData = data.body;
        this.food_id = this.menuData.id;
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
