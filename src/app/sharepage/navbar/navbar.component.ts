import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public front:FrontendService) { }

  ngOnInit(): void {
  }

}
