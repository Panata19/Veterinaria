import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoData } from '../../interfaces/ProductData';
import { SelectTypes } from '../interfaces/selected.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    max-height: 200px;
    max-width: 300px;
  }

  .shade{
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }
  .shade:active{
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
  .custom-error {
    margin-top: 5px;
    background: white;
    width: fit-content;
  }

  `]
})
export class AddProductModalComponent implements OnInit {
  
  public comprobandoUrl: boolean = false;
  public imgPreview: string = '../assets/img/Artboard.svg';

  public myForm: FormGroup = this.form.group({
    id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    name: ['', Validators.required],
    image: ['', Validators.required],
    status: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    quantitys: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  })

  constructor(
    public dialogRef: MatDialogRef<AddProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoData,
    private form: FormBuilder
  ) { console.log(this.myForm?.value?.id) }
  
  //** Opciones Para el DropDown Select **//
  Types: SelectTypes[] = [
    {value: 'IN STOCK', viewValue: 'IN STOCK'},
    {value: 'LOW STOCK', viewValue: 'LOW STOCK'},
    {value: 'OUT OF STOCK', viewValue: 'OUT OF STOCK'},
  ];
  selectedType = this.Types[2].value;

  //** Opciones para los RadioButton Categoria **//
  categorys: string[] = ['Accesorios', 'Electrónica', 'Ropa', 'Fitness'];
  
  //** Permite Vaciar el campo con un boton **//
  checkData = {
    id: false,
    name: false,
    image: false,
    price: false,
    category: false,
    quantitys: false,
    status: false,
  }
  //** Mensajes de Error **//
  checklabel = {
    id: '',
    name: '',
    image: '',
    price: '',
    category: '',
    quantitys: '',
    status: '',
  }

  //** Validaciones para Campos - Checks y Clears **//
  getErrorMessage(name: string, item: AbstractControl | null) {    
    let typeValue = name as keyof typeof this.checklabel
    if(item!.hasError('pattern')) {      
      this.checklabel[typeValue] = 'El valor debe ser numérico *'; 
      item!.valid ? this.checkData[typeValue] = true : this.checkData[typeValue] = false;
    } else if (item!.hasError('required')) {
      this.checklabel[typeValue] = 'Debes introducir un valor * ';
    } else {
      this.checklabel[typeValue] = '' 
      item!.valid ? this.checkData[typeValue] = true : this.checkData[typeValue] = false;
    }
  }

  checkID(){
    let id = this.myForm.get('id');
    this.getErrorMessage('id', id);
  }

  clearID(){ this.myForm.get('id')!.reset(); }

  checkName(){
    let name = this.myForm.get('name');
    this.getErrorMessage('name', name);
  }

  clearName(){ this.myForm.get('name')!.reset();  }

  checkImage(){
    let image = this.myForm.get('image');
    this.compruebaUrl(image);
    image!.valid ? this.checkData.image = true : this.checkData.image = false;
  }

  clearImage(){ this.myForm.get('image')!.reset(); }

  checkQuantitys(){
    let quantitys = this.myForm.get('quantitys');
    this.checkCantidadxEstatus(quantitys);
    this.getErrorMessage('quantitys', quantitys);
  }

  clearQuantitys(){ this.myForm.get('quantitys')!.reset(); }

  checkPrice(){
    let price = this.myForm.get('price');
    this.getErrorMessage('price', price);
  }

  clearPrice(){  this.myForm.get('price')!.reset();  }

  get comprueba(){
    return this.myForm.valid
  }

  checkCantidadxEstatus(quantitys: AbstractControl | null){
    switch (true) {
      case quantitys!.value > 10:
        this.myForm.get('status')!.setValue('IN STOCK');
        break;
      case quantitys!.value > 0 && quantitys!.value <= 10:
        this.myForm.get('status')!.setValue('LOW STOCK');
        break;
      case quantitys!.value === 0:
        this.myForm.get('status')!.setValue('OUT OF STOCK');
        break;
    }
  }

  compruebaUrl(image: any): void{
    if(image?.status === 'VALID'){
      this.comprobandoUrl = image?.value.endsWith(".png") || image?.value.endsWith(".jpg") || image?.value.endsWith(".svg");
      this.imgPreview = image?.value;
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
