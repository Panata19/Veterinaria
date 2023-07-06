import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

  fontStyleControl = new FormControl('grid_view');
  List: boolean = true;
  Grid: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  viewGrid(): void{
    if(this.Grid === false){
      this.Grid = !this.Grid;
      this.List = !this.List;
    }
    console.log('Grid', this.Grid)
    console.log('List', this.List)
    console.log('----')
  }

  viewList(): void {
    if(this.List === false){
      this.Grid = !this.Grid;
      this.List = !this.List;
    }
    console.log('List', this.List)
    console.log('Grid', this.Grid)
    console.log('----')
  }

}
