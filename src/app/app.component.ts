import { Component } from '@angular/core';
import { appRoutes } from "./core/routing.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'symbols-app';

  navLinks = appRoutes

  constructor() { }
}
