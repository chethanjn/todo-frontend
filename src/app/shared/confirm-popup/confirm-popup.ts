import {Component, Inject} from '@angular/core';
import {MaterialModule} from '../../app.material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-popup',
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './confirm-popup.html',
  styleUrl: './confirm-popup.scss',
})
export class ConfirmPopup {
  constructor(
    private dialogRef: MatDialogRef<ConfirmPopup>,
    @Inject(MAT_DIALOG_DATA) public data: {title:string; message:string},
  ) {}

  cancel(){
    this.dialogRef.close(false);
  }

  confirm(){
    this.dialogRef.close(true);
  }

}
