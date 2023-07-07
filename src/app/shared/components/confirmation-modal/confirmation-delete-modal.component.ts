import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import DialogData from './interfaces/DialogData';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './confirmation-modal.component.html',
  styles: [`
    .btn-red{
    color: #ffffff;
    background: #EF4444;
    border-color: #EF4444;
    }
    .btn-red:hover{
      background: #DC2626;
      color: #ffffff;
      border-color: #DC2626;
      outline-color: red;
    }
  `]
})
export class ConfirmationModalComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { 
      data.confirmation = true;
    }
    
  onNoClick(): void {
    this.dialogRef.close();
  }
}
