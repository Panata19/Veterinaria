import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { TiendaService } from '../../services/tienda.service';
import { ProductoData } from '../../interfaces/ProductData';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

  fontStyleControl = new FormControl('grid_view');
  List: boolean = true;
  Grid: boolean = false;

  Products: ProductoData[] = [];

  length: number = 50;
  pageSize = 8;
  pageIndex = 0;
  pageSizeOptions = [4, 8, 24, 50];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  constructor(private TiendaService: TiendaService) { 
    this.Products = TiendaService.getProducts();
    this.length = this.Products.length;
  }

  ngOnInit(): void {
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
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
