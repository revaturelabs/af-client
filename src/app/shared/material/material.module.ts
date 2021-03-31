import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  exports: [
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule
  ],
})
export class MaterialModule {}
