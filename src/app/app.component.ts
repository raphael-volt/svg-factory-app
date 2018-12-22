import { Component, OnInit } from '@angular/core';
import { appRoutes } from "./core/routing.module";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web-app';

  navLinks = appRoutes

  constructor() {
    
  }
  ngOnInit() {


  }

}
