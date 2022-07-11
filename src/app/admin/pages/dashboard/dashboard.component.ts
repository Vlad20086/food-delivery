import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','./../../admin-global.css'],
  // encapsulation:ViewEncapsulation.None // i have write css styles classes in this component of <app-navbar> , 
})
export class DashboardComponent implements OnInit {

  constructor(private api:ApiService, public loginService:LoginService) {
    // window.location.reload();
  }

  foodData:any;

  totalFood:number = 0;
  totalProfit:number = 0;
  totalOrders:number = 0;
  totalSale:number = 0;
  totalSalePrice:number = 0 ;
  totalFeedback:number = 0;

  salesData:any;


  getFood(){
    this.api.getFood().subscribe({
      next:data=>{
        if(data.itemCount > 0){
          this.foodData = data.body;
          this.totalFood = data.itemCount;
        }
      },
      error: error=>{
        console.warn(error.message);
      }
    })
  }

  getfeedback(){
    this.api.getFeedback().subscribe({
      next:data=>{
        if(data.itemCount > 0){
          this.totalFeedback = data.itemCount;
        }
      },
      error: error=>{
        console.warn(error.message);
      }
    })
  }

  getSales(){
    this.api.getSalesFood().subscribe({
      next:data=>{
        console.warn(data);
        if(data.itemCount > 0 ){
          this.salesData = data.body;
          this.totalSale = data.itemCount;
          for(let i = 0; i < data.body.length; i++){
            this.totalSalePrice += parseInt(data.body[i].price);  
          }
        }
      },
      error: error=>{
        console.warn(error.message);
      }
    })
  }
  adminName:string = "Reload Page";
  onSearch(){
    alert("not working yet");
    
  }
  ngOnInit(): void {
    this.getFood();
    this.getSales();
    this.loginService.isLogin();
    this.getfeedback();
  }
  ngDoChecks(){
    
  }

}
