import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>
  ) { }

  ngOnInit() {
  }

  onNoClick(): void{
    this.dialogRef.close(false);
  }

  onYesClick(): void{
    this.dialogRef.close(true);
  }

}
