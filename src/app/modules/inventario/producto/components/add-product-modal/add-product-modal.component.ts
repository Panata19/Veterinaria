import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoData } from '../../interfaces/ProductData';
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
  .shade{
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }
  .shade:active{
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
  `]
})
export class AddProductModalComponent implements OnInit {
  
  public comprobandoUrl: boolean = false;
  public srcUrl: string = '../assets/img/Artboard.svg';

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
  ) {}

  Types: SelectTypes[] = [
    {value: 'IN STOCK', viewValue: 'IN STOCK'},
    {value: 'LOW STOCK', viewValue: 'LOW STOCK'},
    {value: 'OUT OF STOCK', viewValue: 'OUT OF STOCK'},
  ];
  selectedType = this.Types[2].value;

  categorys: string[] = ['Accesorios', 'Electrónica', 'Ropa', 'Fitness'];
  
  checkData = {
    id: false,
    name: false,
    image: false,
    price: false,
    category: false,
    quantitys: false,
    status: false,
  }

  //** Validaciones para Campos - Checks y Clears **//
  checkID(){
    let id = this.myForm.get('id');
    id?.status === 'VALID' ? 
      this.checkData.id = true : 
      this.checkData.id = false;
  }

  clearID(){
    //this.myForm.get('id')!.setValue('nuevo valor');
    this.myForm.get('id')!.reset();
    this.checkData.id = false;
  }

  checkName(){
    let name = this.myForm.get('name');
    name?.status === 'VALID' ? 
      this.checkData.name = true : 
      this.checkData.name = false;
  }

  clearName(){
    this.myForm.get('name')!.reset();
    this.checkData.name = false;
  }

  checkImage(){
    let image = this.myForm.get('image');
    this.compruebaUrl(image);
    image?.status === 'VALID' ? 
      this.checkData.image = true : 
      this.checkData.image = false;
  }

  clearImage(){
    this.myForm.get('image')!.reset();
    this.checkData.image = false;
  }

  checkQuantitys(){
    let quantitys = this.myForm.get('quantitys');
    this.checkCantidadxEstatus(quantitys);
    quantitys?.status === 'VALID' ? 
      this.checkData.quantitys = true : 
      this.checkData.quantitys = false;
  }

  clearQuantitys(){
    this.myForm.get('quantitys')!.reset();
    this.checkData.quantitys = false;
  }

  checkPrice(){
    let price = this.myForm.get('price');
    price?.status === 'VALID' ? 
      this.checkData.price = true : 
      this.checkData.price = false;
  }

  clearPrice(){
    this.myForm.get('price')!.reset();
    this.checkData.price = false;
  }

  get comprueba(){
    return this.myForm.valid
  }

  checkCantidadxEstatus(quantitys: any){
    switch (true) {
      case quantitys.value > 10:
        this.myForm.get('status')!.setValue('IN STOCK');
        break;
      case quantitys.value > 0 && quantitys.value <= 10:
        this.myForm.get('status')!.setValue('LOW STOCK');
        break;
      case quantitys.value === 0:
        this.myForm.get('status')!.setValue('OUT OF STOCK');
        break;
    }
  }

  compruebaUrl(image: any): void{
    if(image?.status === 'VALID'){
      this.comprobandoUrl = image?.value.endsWith(".png") || image?.value.endsWith(".jpg");
      this.srcUrl = image?.value;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  submit(){
    this.data.id = this.myForm.get('id')!.value;
    this.data.name = this.myForm.get('name')!.value;
    this.data.image = this.myForm.get('image')!.value;
    this.data.price = this.myForm.get('price')!.value;
    this.data.category = this.myForm.get('category')!.value;
    this.data.quantitys = this.myForm.get('quantitys')!.value;
    this.data.status = this.myForm.get('status')!.value;
  }
}
