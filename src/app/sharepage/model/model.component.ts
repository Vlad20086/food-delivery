import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @Input()headingMsg!:string ;


  @Output()cancel:EventEmitter<any> = new EventEmitter();
  @Output()addCart:EventEmitter<any> = new EventEmitter();

  @Output()addOrder:EventEmitter<any> = new EventEmitter();

  @Input()userOrderForm!:boolean;
  // @Output()place:EventEmitter<any> = new EventEmitter();

  message:string = '';
  constructor(private api:ApiService, private route:Router, private front:FrontendService) { }

  closeModel(){
    this.cancel.emit(); // trigger the closeModelButton via another component
  }
  addClickCart(){
    this.addCart.emit();
  }
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

  click(){
    console.warn("clicked");
  }

  placeOrder(){
    const formData  = new FormData();
    let order_id = Math.floor(Math.random()*999999-999+1)+999;
    for(let i = 0; this.front.foodItems.length > i; i++){
        console.warn(this.front.foodItems);
        formData.append("name", this.orderForm.value.name);
        formData.append("address", this.orderForm.value.address);
        formData.append("number", this.orderForm.value.number);
        formData.append("food_id",this.front.foodItems[i].food_id);
        formData.append("order_id",order_id.toString());
        this.api.addOrder(formData).subscribe({
          next:data=>{
            // if(this.front.getFoodItems().length < i-1){
              this.message = "Your order has been Recieved, We'll soon contact you :)"
              setTimeout(()=>{
                this.message = "";
                this.orderForm.reset();
                this.route.navigate(['track-order'], {fragment:data.order_id})
              },2000)
            // }
          },
          error:error=>{
            this.message = error.message;
            setTimeout(()=>{
              this.message = "";
            },4000)
          }
        });
      }
    } 
  
  ngOnInit(): void {
  }
}
