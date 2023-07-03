import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ProductoData from '../../interfaces/ProductData';

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

  compruebaUrl(): void{
    console.log(this.data.image)
    if(this.data.image !== undefined){
      this.comprobandoUrl = this.data.image.endsWith(".png") || this.data.image.endsWith(".jpg");
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
  }
}
