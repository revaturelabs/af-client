import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
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
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
  ],
})

export class MaterialModule {}