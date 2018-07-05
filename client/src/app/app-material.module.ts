import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  MatButtonModule,
  MatInput,
  MatRadioButton,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatDialogModule,
  MatSliderModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule,
  MatMenuModule,
  MatSortModule,
  MatPaginatorModule,
  MatSidenavModule
} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSliderModule,
    MatStepperModule,
    MatListModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSliderModule,
    MatStepperModule,
    MatListModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule
  ],
  declarations: []
})
export class AppMaterialModule { }