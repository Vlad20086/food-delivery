import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  foodItems:any = [];
  totalPrice:number = 0;

  cartLength:number = 0;

  websitename:any;
  homeheading:any;
  homebuttontext:any;
  aboutheading:any;
  aboutdescription:any;
  navbarhome:any;
  navbarmenu:any;
  navbartrackorder:any;
  navbarabout:any;
  navbarcontact:any;
  linkfacebook:any;
  linkyoutube:any;
  linkwhatsapp:any;
  linkemail:any;
  theme1:any;
  theme2:any;
  theme3:any;

  constructor(private api:ApiService) {
    this.webContent();
  }  
    addToCart(food:any){
        this.foodItems.push(food);
        sessionStorage.setItem("cartItems", JSON.stringify(this.foodItems));
    }
    getFoodItems(){
      if(sessionStorage.getItem("cartItems")){
        this.subTotal();
        let cartItems:any = sessionStorage.getItem("cartItems");
        this.cartLength  = JSON.parse(cartItems).length;
        return JSON.parse(cartItems); 
      }
    }
    clearFoodItems(){
      this.subTotal();
      sessionStorage.removeItem("cartItems");
      this.foodItems = []
      this.cartLength  = 0;
    }

    subTotal(){
      this.totalPrice = 0;
      if(sessionStorage.getItem("cartItems")){
          let cartItem1:any = sessionStorage.getItem("cartItems");
          let cartItem = JSON.parse(cartItem1);
          for(let i = 0; i < cartItem.length; i++){
            this.totalPrice += parseInt(cartItem[i].price);
          }
      }
    }
    removeOneFood(id:number){
      if(sessionStorage.getItem("cartItems")){
        let cartItem1:any = sessionStorage.getItem("cartItems");
        this.foodItems = JSON.parse(cartItem1); 

        for (let item of this.foodItems) {
          if (id === item.food_id) {
              this.foodItems.splice(this.foodItems.indexOf(item), 1);
              sessionStorage.setItem("cartItems", JSON.stringify(this.foodItems));
              let cartItem1:any = sessionStorage.getItem("cartItems");
              let cartItem = JSON.parse(cartItem1);
              this.cartLength = cartItem.length;
              this.subTotal();
          }
        }
      }else {
        console.warn("no data");
      }
    }
    webContent(){
      this.api.getWebContent().subscribe({
        next:data=>{
          this.websitename = data.body.website_name,
          this.homeheading = data.body.home_heading,
          this.homebuttontext = data.body.home_center_button,
          this.aboutheading = data.body.about_heading,
          this.aboutdescription = data.body.about_description,
  
          this.navbarhome = data.body.navbar_home,
          this.navbarmenu = data.body.navbar_menu,
          this.navbartrackorder = data.body.navbar_status,
          this.navbarabout = data.body.navbar_about,
          this.navbarcontact = data.body.navbar_contact,
  
          this.linkfacebook = data.body.facebook_link,
          this.linkyoutube = data.body.youtube_link,
          this.linkwhatsapp = data.body.whatsapp_link,
          this.linkemail = data.body.email_link
          this.theme1 = data.body.home_heading_theme1;
          this.theme2 = data.body.home_heading_theme2;
          this.theme3 = data.body.home_heading_theme3;
        },
        error:error=>{
          console.warn(error.message);
        }
      })
    }
}
