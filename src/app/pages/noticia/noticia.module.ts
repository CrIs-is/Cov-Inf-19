import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticiaPageRoutingModule } from './noticia-routing.module';

import { NoticiaPage } from './noticia.page';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { TextFormatPipe } from 'src/app/pipes/text-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticiaPageRoutingModule,
    IonicHeaderParallaxModule
  ],
  declarations: [NoticiaPage,TextFormatPipe]
})
export class NoticiaPageModule {}
