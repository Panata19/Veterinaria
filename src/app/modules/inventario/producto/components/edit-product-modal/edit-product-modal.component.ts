import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoData } from '../../interfaces/ProductData';
import { SelectTypes } from '../interfaces/selected.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styles: [
  ]
})
export class EditProductModalComponent implements OnInit {

  public comprobandoUrl: boolean = false;
  public imgPreview: string = '../assets/img/Artboard.svg';

  public myForm: FormGroup = this.form.group({
    id: [this.data.id, [Validators.required, Validators.pattern('^[0-9]+$')]],
    name: [this.data.name, Validators.required],
    image: [this.data.image.url, Validators.required],
    status: [this.data.status, Validators.required],
    category: [this.data.category, Validators.required],
    price: [this.data.price, [Validators.required, Validators.pattern('^[0-9]+$')]],
    quantitys: [this.data.quantitys, [Validators.required, Validators.pattern('^[0-9]+$')]],
  })
  
  
  constructor(
    public dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoData,
    private form: FormBuilder
  ) { }
  
  //** Opciones Para el DropDown Select **//
  Types: SelectTypes[] = [
    {value: 'DISPONIBLE', viewValue: 'DISPONIBLE'},
    {value: 'BAJO STOCK', viewValue: 'BAJO STOCK'},
    {value: 'AGOTADO', viewValue: 'AGOTADO'},
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
      this.comprobandoUrl = image?.value.endsWith(".png") || image?.value.endsWith(".jpg");
      this.imgPreview = image?.value;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.comprobandoUrl = true;
    this.imgPreview = this.data.image.url;
  }

  submit(){
    this.data.id = this.myForm.get('id')!.value;
    this.data.name = this.myForm.get('name')!.value;
    this.data.image.url = this.myForm.get('image')!.value;
    this.data.image.loading = true;
    this.data.price = this.myForm.get('price')!.value;
    this.data.category = this.myForm.get('category')!.value;
    this.data.quantitys = this.myForm.get('quantitys')!.value;
    this.data.status = this.myForm.get('status')!.value;
  }

}
