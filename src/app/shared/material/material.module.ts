import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

const modules = [
  MatCardModule,
  MatDividerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatTableModule,
  MatInputModule,
  MatPaginatorModule,
  MatDialogModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSortModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatSelectModule,
];
@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MaterialModule {}
