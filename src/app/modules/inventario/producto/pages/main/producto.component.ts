import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel, DataSource } from '@angular/cdk/collections';

import ProductoData from '../../interfaces/ProductData';
import { ProductsService } from '../../services/products.service';
import { Observable, ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, AfterViewInit  {
  
  displayedColumns: string[] = ['select','id', 'name', 'image', 'price', 'category', 'quantitys', 'status','buttons'];
  dataSource: MatTableDataSource<ProductoData>;
  selection: SelectionModel<ProductoData>;
  users!:ProductoData[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private ProductsService: ProductsService) {

    // Create 100 users
    this.users = this.ProductsService.getProducts();
    //const users:ProductoData[] = []
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users);
    this.selection = new SelectionModel<ProductoData>(true, []);
  }
  
  ngOnInit(): void {}
  
  addProduct(){
    this.ProductsService.addProduct({id: '89', name: 'prueba', image: 'Prueba.jpg', price: 8, category: 'Siu', quantitys: 5, status:'LOWSTOCK', buttons: true});
    this.ngAfterViewInit();
  }
  removeButton(){
    return  this.selection.selected.length === 0;
  }
  removeProduct(product?:ProductoData){
    let selecteds:ProductoData[] = this.selection.selected;
    console.log(selecteds);
    if(product===undefined){
      selecteds.forEach( (index) => {
        this.selection.deselect(index);
        this.ProductsService.deleteProduct(index);
      });
    }else{
      this.ProductsService.deleteProduct(product);
    }
    
    this.ngAfterViewInit();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProductoData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


class ExampleDataSource extends DataSource<ProductoData> {
  private _dataStream = new ReplaySubject<ProductoData[]>();

  constructor(initialData: ProductoData[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<ProductoData[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: ProductoData[]) {
    this._dataStream.next(data);
  }
}