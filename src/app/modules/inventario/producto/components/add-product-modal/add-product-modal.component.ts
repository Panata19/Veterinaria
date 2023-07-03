import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ProductoData from '../../interfaces/ProductData';
import { SelectTypes } from '../interfaces/selected.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  public myForm: FormGroup = this.form.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    image: ['', Validators.required],
    status: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    quantitys: ['', Validators.required],
  })

  constructor(
    public dialogRef: MatDialogRef<AddProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoData,
    private form: FormBuilder
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
  
  consol(){
    if(this.myForm!.get('id')){
      let co = this.myForm.get('id')!.value ||'es nulo';
      console.log(co);
      /** Agregar Data lo de myForm **/
    }
  }

  get id() {  return this.myForm.get('id');  }
  get name() { 
    let name = this.myForm.get('name');
    console.log(name?.status);
    switch (name?.status) {
      case 'VALID':
        return true;
        
      case 'INVALID':
        return false;
        
      default:
        return false;    
    }
  }

  get comprueba(){
    return !this.id!.valid
  }

  datos(){
    let formValues = this.myForm.value;
    console.log(formValues);
  }

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
