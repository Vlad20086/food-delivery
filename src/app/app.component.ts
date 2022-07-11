import { Component, OnInit } from '@angular/core';
import { FrontendService } from './services/frontend.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cloudkitchenweb';

  constructor(private front:FrontendService){}

  ngOnInit(): void {

  }
}
