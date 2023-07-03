import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ProductoData from '../../interfaces/ProductData';
import { SelectTypes } from '../interfaces/selected.interface';


@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styles: [`
  .right-align {
    text-align: right;
  }

  input.right-align::-webkit-outer-spin-button,
  input.right-align::-webkit-inner-spin-button {
    display: none;
  }

  input.right-align {
    -moz-appearance: textfield;
  }
  .w-img{
    width: 300px;
    height: 200px;
  }
  `]
})
export class AddProductModalComponent implements OnInit {
  
  public comprobandoUrl: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoData,
  ) {
    data.buttons = true;
  }

  Types: SelectTypes[] = [
    {value: 'IN STOCK', viewValue: 'IN STOCK'},
    {value: 'LOW STOCK', viewValue: 'LOW STOCK'},
    {value: 'OUT OF STOCK', viewValue: 'OUT OF STOCK'},
  ];
  selectedType = this.Types[2].value;

  categorys: string[] = ['Accesorios', 'Electrónica', 'Ropa', 'Fitness'];

  checkCantidadxEstatus(){
    switch (true) {
      case this.data.quantitys > 10:
        this.data.status = 'IN STOCK';
        break;
      case this.data.quantitys > 0 && this.data.quantitys <= 10:
        this.data.status = "LOW STOCK";
        break;
      case this.data.quantitys === 0:
        this.data.status = "OUT OF STOCK"
        break;
    }
  }

  compruebaUrl(): void{
    if(this.data.image !== undefined){
      this.comprobandoUrl = this.data.image.endsWith(".png") || this.data.image.endsWith(".jpg");
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
  }

  submit(){
    
  }
}
