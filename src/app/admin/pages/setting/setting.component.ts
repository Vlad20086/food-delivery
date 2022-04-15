import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css' ,'./../../admin-global.css']
})
export class SettingComponent implements OnInit {

  hideProfile:boolean = true;
  hideWebContent:boolean = false;
  constructor(public loginService:LoginService) { }


  webContent(){
    this.hideProfile = false;
    this.hideWebContent = true;
  }
  profile(){
    this.hideProfile = true;
    this.hideWebContent = false;
  }
  ngOnInit(): void {
  }

}
