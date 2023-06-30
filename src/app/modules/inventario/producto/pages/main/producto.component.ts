import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import UserData from '../../interfaces/UserData';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [`
    .shade{
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }
    .shade:active{
      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    }
    .btn-morado {
      color: #fff;
      background-color: #A855F7;
      border-color: #A855F7;
    }
    .btn-morado:hover{
      background: #9333EA;
      color: #ffffff;
      border-color: #9333EA;
    }
    .btn-green{
      color: #fff;
      background-color: #28A745;
      border-color: #28A745;
    }
    .btn-green:hover{
      color: #fff;
      background-color: #218838;
      border-color: #1e7e34;
    }
    .btn-red{
      color: #ffffff;
      background: #EF4444;
      border-color: #EF4444;
    }
    .btn-red:hover{
      background: #DC2626;
      color: #ffffff;
      border-color: #DC2626;
    }
    button:active .text-white-50 {
      color: rgba(255,255,255,1) !important;
    }
    button span:nth-child(2){
      padding-left: 10px;
    }

    table {
      width: 100%;
    }
    .mat-mdc-form-field {
      font-size: 14px;
      width: 100%;
    }
    td, th {
      width: 25%;
    }
  `]
})
export class ProductoComponent implements OnInit, AfterViewInit  {
  
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  
  ngOnInit(): void {
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

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
