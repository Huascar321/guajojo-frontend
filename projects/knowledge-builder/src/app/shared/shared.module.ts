import { NgModule } from '@angular/core';
import { DialogComponent } from './components/dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [CommonModule, MaterialModule, ReactiveFormsModule]
})
export class SharedModule {}
