import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';

import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FooterComponent, 
    HeaderComponent, 
    ContentComponent,
    NavbarComponent
  ],
  exports: [ContentComponent]
})
export class LayoutModule { }
