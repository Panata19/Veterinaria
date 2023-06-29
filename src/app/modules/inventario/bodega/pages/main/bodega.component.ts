import { Component, OnInit } from '@angular/core';
//import DataTable from 'datatables.net-dt';
import DataTable from 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-colreorder-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-scroller-bs4';
import 'datatables.net-searchpanes-bs4';
import 'datatables.net-select-bs4';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styles: [
  ]
})
export class BodegaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let table = new DataTable('#myTable', {
      
    });
    
  }
  /** 
   * npm install --save datatables.net-bs4
    npm install --save datatables.net-buttons-bs4
    npm install --save datatables.net-responsive-bs4
    npm install --save datatables.net-scroller-bs4
    npm install --save datatables.net-searchpanes-bs4
    npm install --save datatables.net-select-bs4
   * 
   * **/
}
