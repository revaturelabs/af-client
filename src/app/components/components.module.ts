import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../shared/material/material.module';

const components = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule, MaterialModule],
  exports: [components],
})
export class ComponentsModule {}
