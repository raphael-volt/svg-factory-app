import { Component, OnInit } from '@angular/core';
import { SymbolService } from "./symbol/symbol.service";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web-app';

  navLinks = [
    {
      path: 'list',
      label: 'Motifs',
      icon: 'th-list'
    },
    {
      path: 'import',
      label: 'Importer',
      icon: 'file-import'
    },
    {
      path: 'catalog',
      label: 'Catalogue',
      icon: 'book-open'
    }
    
  ]

  constructor(
    private symbolService: SymbolService,
    private router: Router) {
    let sub = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        sub.unsubscribe()
        this.symbolService.getList().subscribe(symbols => {

        })
      }
    })

  }
  ngOnInit() {


  }

}
