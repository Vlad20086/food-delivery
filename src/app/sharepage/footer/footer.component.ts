import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public fornt:FrontendService) { }
  today:Date  = new Date();
  ngOnInit(): void {
  }

}
