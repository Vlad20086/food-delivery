import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  foodItems:any = [];
  totalPrice:number = 0;

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
