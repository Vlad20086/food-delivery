import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public front:FrontendService) { }

  ngOnInit(): void {
  }

}
