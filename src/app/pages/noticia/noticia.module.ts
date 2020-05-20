import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticiaPageRoutingModule } from './noticia-routing.module';

import { NoticiaPage } from './noticia.page';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { pipeModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticiaPageRoutingModule,
    IonicHeaderParallaxModule,
    pipeModule
  ],
  declarations: [NoticiaPage]
})
export class NoticiaPageModule {}
