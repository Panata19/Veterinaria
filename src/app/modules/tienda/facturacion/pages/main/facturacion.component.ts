import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styles: [`
    .selected {
      background-color: #3158C9;
      color: black;
    }
  `]
})
export class FacturacionComponent implements OnInit {

  fontStyleControl = new FormControl('grid_view');
  List: boolean = true;
  Grid: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  viewGrid(): void{
    console.log('Grid')
    if(this.Grid === false){
      this.Grid = !this.Grid;
      this.List = !this.List;
    }
  }

  viewList(): void {
    console.log('List')
    if(this.List === false){
      this.Grid = !this.Grid;
      this.List = !this.List;
    }
  }

}
