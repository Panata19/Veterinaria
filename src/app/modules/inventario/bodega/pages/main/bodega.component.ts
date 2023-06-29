import { Component, OnInit } from '@angular/core';
import DataTable from 'datatables.net-bs4';


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
      paging: true,
      ordering: true,
      info: true,
      lengthMenu: [
        [5,10, 25, 50, -1],
        [5,10, 25, 50, 'All'],
      ],
      
     });
    
  }
  /**
    npm install --save jquery
    npm install --save datatables.net-bs4
    npm install --save datatables.net-responsive-bs4
   * 
   * 
   import DataTable from 'datatables.net-bs4';
   import 'datatables.net-keytable-bs4';
   import 'datatables.net-responsive-bs4';
   * */ 
}
